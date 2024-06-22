import { CommandHandler, ICommandHandler } from '@cqrs/custom-cqrs-package';
import { Transactional } from 'typeorm-transactional';
import { DeleteHeroCommand } from '../impl/delete-hero.command';
import { HeroModel } from '../../models/hero.model';
import { HeroesModelFactoryService } from '../../factories';
// import { HeroesEventStoreRepository } from '../../repository/event-store.repository';
import { EventStoreRepository } from '../../../event-store/event-store.repository';

@CommandHandler(DeleteHeroCommand)
export class DeleteHeroCommandHandler
  implements ICommandHandler<DeleteHeroCommand> {
  constructor (
    private readonly modelFactory: HeroesModelFactoryService,
    private readonly eventStore: EventStoreRepository<HeroModel>
  ) {}

  @Transactional({ connectionName: 'heroes-write' })
  async execute(command: DeleteHeroCommand) {
    try {
      const { uuid, requestId } = command;

      const hero = await this.modelFactory.initExistingModel(uuid);
      await hero.delete(uuid, requestId);

      // Save into write DB
      await this.eventStore.saveEvents(hero);
      
      await hero.commit();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
