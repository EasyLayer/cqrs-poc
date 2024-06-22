import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@cqrs/custom-cqrs-package';
import { HeroModel } from '../models/hero.model';
import { EventStoreRepository } from '../../event-store/event-store.repository';

@Injectable()
export class HeroesModelFactoryService {
  constructor(
    private readonly eventStore: EventStoreRepository<HeroModel>,
    private readonly publisher: EventPublisher,
  ) {}

  public createNewModel(): HeroModel {
    return this.publisher.mergeObjectContext(new HeroModel());
  }
  
  public async initExistingModel(aggregateId: string): Promise<HeroModel> {
    const heroModel = this.createNewModel();

    heroModel.id = aggregateId;

    return await this.eventStore.getOne(heroModel);
  }
}
