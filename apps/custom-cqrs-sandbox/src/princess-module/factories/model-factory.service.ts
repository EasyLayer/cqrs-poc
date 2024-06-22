import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@cqrs/custom-cqrs-package';
import { PrincessModel } from '../models/princess.model';
import { EventStoreRepository } from '../../event-store/event-store.repository';

@Injectable()
export class PrincessModelFactoryService {
  constructor(
    private readonly eventStore: EventStoreRepository<PrincessModel>,
    private readonly publisher: EventPublisher,
  ) {}

  public createNewModel(): PrincessModel {
    return this.publisher.mergeObjectContext(new PrincessModel());
  }
  
  public async initExistingModel(aggregateId: string): Promise<PrincessModel> {
    const princessModel = this.createNewModel();

    princessModel.id = aggregateId;

    return await this.eventStore.getOne(princessModel);
  }
}
