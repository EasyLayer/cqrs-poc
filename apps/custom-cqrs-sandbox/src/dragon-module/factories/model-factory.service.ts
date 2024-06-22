import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@cqrs/custom-cqrs-package';
import { EventStoreRepository } from '../../event-store/event-store.repository';
import { DragonModel } from '../models/dragon.model';

@Injectable()
export class DragonModelFactoryService {
  constructor(
    private readonly eventStore: EventStoreRepository<DragonModel>,
    private readonly publisher: EventPublisher,
  ) {}

  public createNewModel(): DragonModel {
    return this.publisher.mergeObjectContext(new DragonModel());
  }
  
  public async initExistingModel(aggregateId: string): Promise<DragonModel> {
    const dragonModel = this.createNewModel();

    dragonModel.id = aggregateId;

    return await this.eventStore.getOne(dragonModel);
  }
}
