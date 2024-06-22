import { v4 as uuidv4 } from 'uuid'; 
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@cqrs/custom-cqrs-package';
import { CreatePrincessCommand } from '../commands/impl/create-princess.command';
import { DeletePrincessCommand } from '../commands/impl/delete-princess.command';

@Injectable()
export class PrincessCommandFactoryService {
  constructor(private readonly commandBus: CommandBus) {}

  public async createPrincess({ heroUuid, requestId }): Promise<string> {
    const uuid = uuidv4();
    await this.commandBus.execute(new CreatePrincessCommand(uuid, heroUuid, requestId));
    return uuid;
  }

  public async deletePrincess({ uuid, heroUuid, requestId }): Promise<void> {
    await this.commandBus.execute(new DeletePrincessCommand(heroUuid, uuid, requestId));
  }
}
