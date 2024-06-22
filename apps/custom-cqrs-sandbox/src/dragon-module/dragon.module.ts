import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { DragonController } from './dragon.controller';
import { DragonRepository } from './repository/dragon.repository';
import { DragonViewModel } from './view-models/dragon.view-model';
import { QueryHandlers } from './queries/handlers';
import { CreateDragonSaga } from './sagas';
import { DragonCommandFactoryService, DragonEventFactoryService, DragonModelFactoryService } from './factories';
import { EventStoreModule } from '../event-store/event-store.module';

@Module({
  imports: [
    EventStoreModule.forRoot('dragon-write'),
    TypeOrmModule.forFeature([DragonViewModel], 'read-db'),
  ],
  controllers: [DragonController],
  providers: [
    DragonRepository,
    DragonCommandFactoryService,
    DragonEventFactoryService,
    DragonModelFactoryService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    CreateDragonSaga,
  ]
})
export class DragonModule {}