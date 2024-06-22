import { Injectable, Inject } from '@nestjs/common';
import { Repository, QueryFailedError } from 'typeorm';
import { AggregateRoot, IEvent } from '@cqrs/custom-cqrs-package';
import { EventDataModel } from './event-data.model';

@Injectable()
export class EventStoreRepository<T extends AggregateRoot> {
    constructor(
      @Inject('EVENT_DATA_MODEL_REPOSITORY')
      private eventStore: Repository<EventDataModel>
    ) {}

    public async saveEvents(models: T | T[]): Promise<void> {
        const aggregates: T[] = Array.isArray(models) ? models : [models];

        try {
            await Promise.all(aggregates.map((aggregate: T) => this.storeEvent(aggregate)));
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    private async storeEvent(aggregate: T) {
      try {
          const uncommittedEvents: IEvent[] = aggregate.getUncommittedEvents();

          if (uncommittedEvents.length === 0) {
            return;
          }

          const events = uncommittedEvents.map((event) => {
            return EventDataModel.serialize(event, aggregate.version);
          });
          
          // We use createQueryBuilder with "updateEntity = false" option to ensure there is only one query
          // (without select after insert)
          await this.eventStore
            .createQueryBuilder()
            .insert()
            .values(events)
            .updateEntity(false)
            .execute();
      } catch(error) {
        if (error instanceof QueryFailedError) {
          const driverError = error.driverError;

          // TODO
          if (driverError.code === 'SQLITE_CONSTRAINT') {
            throw new Error('Version conflict error');
            // switch (driverError.constraint) {
            //   // constraints are specified in entities
            //   case 'UQ__request_id__aggregate_id':
            //     console.log('Idempotency protection, just return\n');
            //     return;
            //   case 'UQ__version__aggregate_id':
            //     throw new Error('Version conflict error');
            //   default:
            //     throw error;;
            // }
          }
          throw error;
        }
      }
    }

    public async getOne(aggregate: T & { id: string }, retryLastEvent: boolean = false): Promise<T> {
      if (!aggregate.id) {
        return aggregate;
      }
  
      const eventRaws = await this.eventStore.find({
        where: { aggregateId: aggregate.id },
        order: { version: 'ASC' }
      });
      
      await aggregate.loadFromHistory(eventRaws.map(EventDataModel.deserialize));

      // TODO
      // if (retryLastEvent && eventRaws.length > 0) {
      //   await aggregate.publish(eventRaws[eventRaws.length - 1]);
      // }
    
      return aggregate;
    }
}