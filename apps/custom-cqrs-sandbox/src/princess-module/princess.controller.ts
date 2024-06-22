import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrincessCommandFactoryService } from './factories';

@Controller('princess')
export class PrincessController {
  constructor(
    private readonly commandFactoryService: PrincessCommandFactoryService,
  ) {}

  @Post()
  async createPrincess(
    @Body() dto: { heroUuid: string, requestId: string }
  ) {
    const uuid = await this.commandFactoryService.createPrincess(dto);
    return { uuid };
  }
}
