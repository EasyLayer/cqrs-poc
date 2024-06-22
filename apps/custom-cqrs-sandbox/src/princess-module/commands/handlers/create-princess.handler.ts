import { CommandHandler, ICommandHandler } from '@cqrs/custom-cqrs-package';
import { Transactional } from 'typeorm-transactional';
import { CreatePrincessCommand } from '../impl/create-princess.command';
import { PrincessModel } from '../../models/princess.model';
import { PrincessModelFactoryService } from '../../factories';
import { EventStoreRepository } from '../../../event-store/event-store.repository';

@CommandHandler(CreatePrincessCommand)
export class CreatePrincessCommandHandler implements ICommandHandler<CreatePrincessCommand> {
  constructor(
    private readonly modelFactory: PrincessModelFactoryService,
    private readonly eventStore: EventStoreRepository<PrincessModel>
  ) {}

  @Transactional({ connectionName: 'princess-write' })
  async execute(command: CreatePrincessCommand) {
    try {
        const { uuid, heroUuid, requestId } = command;

        const hero = this.modelFactory.createNewModel();
        await hero.create(uuid, heroUuid, requestId);

        // Save into WriteDB
        await this.eventStore.saveEvents(hero);

        await hero.commit();
        console.log('CreatePrincessCommandHandler execute()\n\n');
    } catch(error) {
        console.error(error);
        throw error;
    }
  }
}
