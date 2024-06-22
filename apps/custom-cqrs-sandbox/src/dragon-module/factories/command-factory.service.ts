import { v4 as uuidv4 } from 'uuid'; 
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@cqrs/custom-cqrs-package';
import { CreateDragonCommand } from '../commands/impl/create-dragon.command';
import { DeleteDragonCommand } from '../commands/impl/delete-dragon.command';

@Injectable()
export class DragonCommandFactoryService {
  constructor(private readonly commandBus: CommandBus) {}

  public async createDragon({ heroUuid, requestId }): Promise<string> {
    const uuid = uuidv4();
    await this.commandBus.execute(new CreateDragonCommand(uuid, heroUuid, requestId));
    return uuid;
  }

  public async deleteDragon({ uuid, heroUuid, requestId }): Promise<void> {
    await this.commandBus.execute(new DeleteDragonCommand(heroUuid, uuid, requestId));
  }
}
