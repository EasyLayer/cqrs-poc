import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { PrincessController } from './princess.controller';
import { QueryHandlers } from './queries/handlers';
import { PrincessRepository } from './repository/princess.repository';
import { PrincessViewModel } from './view-models/princess.view-model';
import { CreatePrincessSaga } from './sagas';
import { PrincessCommandFactoryService, PrincessEventFactoryService, PrincessModelFactoryService } from './factories';
import { EventStoreModule } from '../event-store/event-store.module';

@Module({
  imports: [
    EventStoreModule.forRoot('princess-write'),
    TypeOrmModule.forFeature([PrincessViewModel], 'read-db'),
  ],
  controllers: [PrincessController],
  providers: [
    PrincessRepository,
    CreatePrincessSaga,
    PrincessCommandFactoryService,
    PrincessEventFactoryService,
    PrincessModelFactoryService,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ]
})
export class PrincessModule {}