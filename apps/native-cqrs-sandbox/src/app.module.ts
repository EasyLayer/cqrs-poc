import { Module } from '@nestjs/common';
import { HeroesGameModule } from './heroes-module/heroes.module';
import { AppController } from './app.controller';

@Module({
  imports: [HeroesGameModule],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
