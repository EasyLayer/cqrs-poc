import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@cqrs/native-cqrs-package';
import { QueryBus } from '@cqrs/native-cqrs-package';
import { KillDragonCommand } from './commands/impl/kill-dragon.command';
import { KillDragonDto } from './interfaces/kill-dragon-dto.interface';
import { Hero } from './models/hero.model';
import { GetHeroesQuery } from './queries/impl';

@Controller('hero')
export class HeroesGameController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/kill')
  async killDragon(@Param('id') id: string, @Body() dto: KillDragonDto) {
    console.log('Start request\n');
    await this.commandBus.execute(new KillDragonCommand(id, dto.dragonId));
    console.log('End response\n');
  }

  @Get()
  async findAll(): Promise<Hero[]> {
    return this.queryBus.execute(new GetHeroesQuery());
  }
}
