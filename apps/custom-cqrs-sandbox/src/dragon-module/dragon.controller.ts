import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QueryBus } from '@cqrs/custom-cqrs-package';
import { GetDragonQuery, GetDragonsQuery } from './queries/impl';
import { DragonViewModel } from './view-models/dragon.view-model';
import { DragonCommandFactoryService } from './factories';

@Controller('dragon')
export class DragonController {
  constructor(
    private readonly commandFactoryService: DragonCommandFactoryService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async createDragon(
    @Body() dto: { heroUuid: string, requestId: string }
  ) {
    const uuid = await this.commandFactoryService.createDragon(dto);
    return { uuid };
  }

  @Get()
  async getDragons(): Promise<DragonViewModel[]> {
    return this.queryBus.execute(new GetDragonsQuery());
  }

  @Get('/:uuid')
  async getDragon(
    @Param('uuid') uuid: string
  ): Promise<DragonViewModel> {
    return this.queryBus.execute(new GetDragonQuery(uuid));
  }
}
