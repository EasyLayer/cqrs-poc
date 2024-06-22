import { CommandHandler, ICommandHandler } from '@cqrs/custom-cqrs-package';
import { Transactional } from 'typeorm-transactional';
import { DeleteDragonCommand } from '../impl/delete-dragon.command';
import { DragonModel } from '../../models/dragon.model';
import { DragonModelFactoryService } from '../../factories';
import { EventStoreRepository } from '../../../event-store/event-store.repository';

@CommandHandler(DeleteDragonCommand)
export class DeleteDragonCommandHandler implements ICommandHandler<DeleteDragonCommand> {
  constructor(
    private readonly modelFactory: DragonModelFactoryService,
    private readonly eventStore: EventStoreRepository<DragonModel>
  ) {}

  @Transactional({ connectionName: 'dragon-write' })
  async execute(command: DeleteDragonCommand) {
    try {
        const { uuid, heroUuid, requestId } = command;

        const dragon = await this.modelFactory.initExistingModel(uuid);

        await dragon.delete(uuid, heroUuid, requestId);

        await this.eventStore.saveEvents(dragon);

        await dragon.commit();
    } catch(error) {
      console.error(error);
      throw error;
    }
  }
}
