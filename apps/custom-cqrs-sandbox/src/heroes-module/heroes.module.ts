import { Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { HeroesGameController } from './heroes.controller';
import { QueryHandlers } from './queries/handlers';
import { HeroRepository } from './repository/hero.repository';
import { HeroViewModel } from './view-models/hero.view-model';
import { HeroesSaga } from './sagas';
import { HeroesCommandFactoryService, HeroesModelFactoryService, HeroEventFactoryService } from './factories';
import { EventStoreModule } from '../event-store/event-store.module';

@Module({
  imports: [
    EventStoreModule.forRoot('heroes-write'),
    TypeOrmModule.forFeature([HeroViewModel], 'read-db'),
  ],
  controllers: [HeroesGameController],
  providers: [
    HeroRepository,
    HeroesSaga,
    HeroesCommandFactoryService,
    HeroesModelFactoryService,
    HeroEventFactoryService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class HeroesGameModule {}
