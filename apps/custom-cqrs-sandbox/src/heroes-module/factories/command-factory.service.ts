import { v4 as uuidv4 } from 'uuid'; 
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@cqrs/custom-cqrs-package';
import { UpdateHeroCommand } from '../commands/impl/update-hero-status.command';
import { DeleteHeroCommand } from '../commands/impl/delete-hero.command';
import { CreateHeroCommand } from '../commands/impl/create-hero.command';

@Injectable()
export class HeroesCommandFactoryService {
  constructor(private readonly commandBus: CommandBus) {}

  public async createHero({ requestId }): Promise<string> {
    const uuid = uuidv4();
    await this.commandBus.execute(new CreateHeroCommand(uuid, requestId));
    return uuid;
  }

  public async updateHero({ uuid, requestId }): Promise<void> {
    await this.commandBus.execute(new UpdateHeroCommand(uuid, requestId));
  }

  public async deleteHero({ uuid, requestId }): Promise<void> {
    await this.commandBus.execute(new DeleteHeroCommand(uuid, requestId));
  }
}
