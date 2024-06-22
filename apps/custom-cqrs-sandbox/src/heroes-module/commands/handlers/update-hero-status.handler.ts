import { CommandHandler, ICommandHandler } from '@cqrs/custom-cqrs-package';
import { Transactional } from 'typeorm-transactional';
import { UpdateHeroCommand } from '../impl/update-hero-status.command';
import { HeroModel } from '../../models/hero.model';
import { HeroesModelFactoryService } from '../../factories';
// import { HeroesEventStoreRepository } from '../../repository/event-store.repository';
import { EventStoreRepository } from '../../../event-store/event-store.repository';


@CommandHandler(UpdateHeroCommand)
export class UpdateHeroCommandHandler
  implements ICommandHandler<UpdateHeroCommand> {
  constructor (
    private readonly modelFactory: HeroesModelFactoryService,
    private readonly eventStore: EventStoreRepository<HeroModel>
  ) {}

  @Transactional({ connectionName: 'heroes-write' })
  async execute(command: UpdateHeroCommand) {
    try {
      const { uuid, requestId } = command;

      const hero = await this.modelFactory.initExistingModel(uuid);

      await hero.updateStatus(uuid, requestId);

      // Save into write DB
      await this.eventStore.saveEvents(hero);
      
      await hero.commit();
      console.log('UpdateHeroCommandHandler execute()\n\n');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
