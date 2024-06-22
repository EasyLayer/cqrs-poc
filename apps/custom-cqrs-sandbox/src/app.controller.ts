import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  async checkStatus(): Promise<string> {
    return 'OK';
  }
}
