import * as path from 'path';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Module, OnModuleInit, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule, EventBus, CustomEventBus } from '@cqrs/custom-cqrs-package';
import { HeroesGameModule } from './heroes-module/heroes.module';
import { DragonModule } from './dragon-module/dragon.module';
import { AppController } from './app.controller';
import { PrincessModule } from './princess-module/princess.module';
import { NewPublisher } from './transport/new-publisher';
import { NewSubscriber } from './transport/new-subscriber';

@Module({
  imports: [
    CqrsModule.forRoot({ isGlobal: true }),
    HeroesGameModule,
    DragonModule,
    PrincessModule,
    TypeOrmModule.forRootAsync({
      name: 'read-db',
      useFactory: () => ({
        type: 'sqlite',
        database: path.join(__dirname, '../read.db'),
        entities: [
          path.join(__dirname, './heroes-module/view-models/hero.view-model{.ts,.js}'),
          path.join(__dirname, './dragon-module/view-models/dragon.view-model{.ts,.js}'),
          path.join(__dirname, './princess-module/view-models/princess.view-model{.ts,.js}')
        ],
        synchronize: true,
        logging: true,
      }),
      dataSourceFactory: async (options?: DataSourceOptions) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        // Add a DataSource with a unique name
        return addTransactionalDataSource({
          name: 'read-db',
          dataSource: new DataSource(options)
        });
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    NewPublisher,
    NewSubscriber
  ]
})
export class AppModule  implements OnModuleInit  {
  constructor(
    @Inject(EventBus)
    private readonly event$: CustomEventBus,
    private readonly publisher: NewPublisher,
  ) {}

  async onModuleInit(): Promise<void> {
    this.event$.publisher = this.publisher;
  }
}
