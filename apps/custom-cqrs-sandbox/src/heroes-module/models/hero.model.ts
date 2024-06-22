import { AggregateRoot } from '@cqrs/custom-cqrs-package';
import { HeroCreatedEvent } from '../events/impl/hero-created.event';
import { HeroStatusUpdatedEvent } from '../events/impl/hero-status-updated';
import { HeroDeletedEvent } from '../events/impl/hero-deleted.event';

export class HeroModel extends AggregateRoot {
  public id!: string;
  // public version: number = 0;
  public requestId!: string;
  public dragonId!: string;
  public princessId!: string;
  public status!: string;

  async create(aggregateId: string, requestId: string) {
    await this.apply(new HeroCreatedEvent(aggregateId, requestId));
  }

  async updateStatus(aggregateId: string, requestId: string) {
    // Will work only with requestId (idempotency)
    if (this.status === 'creating') {
      return await this.apply(new HeroStatusUpdatedEvent(aggregateId, 'processing', requestId));
    } else if (this.status === 'processing') {
      return await this.apply(new HeroStatusUpdatedEvent(aggregateId, 'created', requestId));
    } else if (this.status === 'created' || this.status === 'deleted') {
      return;
    }

    throw new Error(`Update Wrong Hero Status, ${this.status}`, );
  }

  async delete(aggregateId: string, requestId: string) {
    // Will work only with operationId (idempotency)
    if (this.status === 'created' || this.status === 'processing' || this.status === 'creating') {
      console.log('FIRST\n\n\n', this.status);
      return await this.apply(new HeroDeletedEvent(aggregateId, 'deleting', this.princessId, this.dragonId, requestId));
    } else if (this.status === 'deleting') {
      console.log('SECOND\n\n\n', this.status);
      return await this.apply(new HeroDeletedEvent(aggregateId, 'deleted', this.princessId, this.dragonId, requestId));
    } else if (this.status === 'deleted') {
      console.log('POPAL\n\n\n', this.status);
      return;
    }

    throw new Error(`Delete Wrong Hero Status, ${this.status}`);
  }

  private onHeroDeletedEvent({  }: HeroDeletedEvent) {
    this.status = 'deleted';
  }

  private onHeroStatusUpdatedEvent({ status }: HeroStatusUpdatedEvent) {
    this.status = status;
  }

  private onHeroCreatedEvent({ id, requestId }: HeroCreatedEvent) {
    this.id = id;
    this.requestId = requestId;
    this.status = 'created';
  }
}
