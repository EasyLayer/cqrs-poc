import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QueryBus } from '@cqrs/custom-cqrs-package';
import { HeroViewModel } from './view-models/hero.view-model';
import { GetHeroesQuery, GetHeroQuery } from './queries/impl';
import { HeroesCommandFactoryService } from './factories';

@Controller('hero')
export class HeroesGameController {
  constructor(
    private readonly commandFactoryService: HeroesCommandFactoryService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createHero(
    @Body() dto: { requestId: string }
  ) {
    const uuid = await this.commandFactoryService.createHero(dto);
    return { uuid };
  }

  @Get()
  async getHeroes(): Promise<HeroViewModel[]> {
    return this.queryBus.execute(new GetHeroesQuery());
  }

  @Get('/:uuid')
  async getHero(
    @Param('uuid') uuid: string
  ): Promise<HeroViewModel> {
    return this.queryBus.execute(new GetHeroQuery(uuid));
  }
}
