import { CommandHandler, ICommandHandler } from '@cqrs/custom-cqrs-package';
import { Transactional } from 'typeorm-transactional';
import { CreateHeroCommand } from '../impl/create-hero.command';
import { HeroModel } from '../../models/hero.model';
import { HeroesModelFactoryService } from '../../factories';
import { EventStoreRepository } from '../../../event-store/event-store.repository';

@CommandHandler(CreateHeroCommand)
export class CreateHeroCommandHandler implements ICommandHandler<CreateHeroCommand> {
  constructor(
    private readonly modelFactory: HeroesModelFactoryService,
    private readonly eventStore: EventStoreRepository<HeroModel>
  ) {}

  @Transactional({ connectionName: 'heroes-write' })
  async execute(command: CreateHeroCommand) {
    try {
        const { uuid, requestId } = command;

        const hero = this.modelFactory.createNewModel();
        await hero.create(uuid, requestId);

        // Save into WriteDB
        await this.eventStore.saveEvents(hero);

        await hero.commit();
        console.log('CreateHeroCommandHandler execute()\n');
    } catch(error) {
        console.error(error);
        throw error;
    }
  }
}
