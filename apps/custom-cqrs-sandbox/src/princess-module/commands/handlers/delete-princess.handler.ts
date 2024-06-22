import { CommandHandler, ICommandHandler } from '@cqrs/custom-cqrs-package';
import { Transactional } from 'typeorm-transactional';
import { DeletePrincessCommand } from '../impl/delete-princess.command';
import { PrincessModel } from '../../models/princess.model';
import { PrincessModelFactoryService } from '../../factories';
import { EventStoreRepository } from '../../../event-store/event-store.repository';

@CommandHandler(DeletePrincessCommand)
export class DeletePrincessCommandHandler implements ICommandHandler<DeletePrincessCommand> {
  constructor(
    private readonly modelFactory: PrincessModelFactoryService,
    private readonly eventStore: EventStoreRepository<PrincessModel>
  ) {}

  @Transactional({ connectionName: 'princess-write' })
  async execute(command: DeletePrincessCommand) {
    try {
        const { uuid, heroUuid, requestId } = command;
        const princess = await this.modelFactory.initExistingModel(uuid);

        await princess.delete(uuid, heroUuid, requestId);

        await this.eventStore.saveEvents(princess);

        await princess.commit();
        console.log('DeletePrincessCommandHandler execute()\n\n');
    } catch(error) {
      throw error;
    }
  }
}
