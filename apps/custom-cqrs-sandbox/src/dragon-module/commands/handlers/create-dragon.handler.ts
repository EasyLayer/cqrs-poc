import { CommandHandler, ICommandHandler } from '@cqrs/custom-cqrs-package';
import { Transactional } from 'typeorm-transactional';
import { CreateDragonCommand } from '../impl/create-dragon.command';
import { DragonModel } from '../../models/dragon.model';
import { DragonModelFactoryService } from '../../factories';
import { EventStoreRepository } from '../../../event-store/event-store.repository';

@CommandHandler(CreateDragonCommand)
export class CreateDragonCommandHandler implements ICommandHandler<CreateDragonCommand> {
  constructor(
    private readonly modelFactory: DragonModelFactoryService,
    private readonly eventStore: EventStoreRepository<DragonModel>
  ) {}

  @Transactional({ connectionName: 'dragon-write' })
  async execute(command: CreateDragonCommand) {
    // throw new Error('Ошибка создания дракоа\n');
    try {
      const { uuid, heroUuid, requestId } = command;

      const dragon = this.modelFactory.createNewModel();
      await dragon.create(uuid, heroUuid, requestId);

      await this.eventStore.saveEvents(dragon);

      await dragon.commit();
      console.log('CreateDragonCommandHandler execute()\n\n');
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
}
