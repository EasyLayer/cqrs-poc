import { join } from 'node:path';
import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource, DataSourceOptions } from 'typeorm';
import { EventDataModel } from './event-data.model';
import { EventStoreRepository } from './event-store.repository';

@Module({})
export class EventStoreModule {
  static forRoot(dbName: string): DynamicModule {
    const databasePath = join(__dirname, '../../', `${dbName}.db`);

    return {
      module: EventStoreModule,
      imports: [
        TypeOrmModule.forRootAsync({
          name: dbName,//'event-store',
          useFactory: () => ({
            type: 'sqlite',
            database: databasePath,
            entities: [EventDataModel],
            synchronize: true,
            logging: true,
            enableWAL: true,
            // Now, when attempting to perform an operation that encountered a block,
            // SQLite will attempt to retry the operation for the specified time before returning an error. 
            // busyTimeout: 1000
          }),
          dataSourceFactory: async (options?: DataSourceOptions) => {
            if (!options) {
              throw new Error('Invalid options passed');
            }
            // Add a DataSource with a unique name
            return addTransactionalDataSource({
              name: dbName,//'event-store',
              dataSource: new DataSource(options)
            });
          },
        }),
      ],
      providers: [
        EventStoreRepository,
        {
          provide: 'EVENT_DATA_MODEL_REPOSITORY',
          useFactory: async (dataSource: DataSource) => dataSource.getRepository(EventDataModel),
          inject: [getDataSourceToken(dbName)],
        },
      ],
      exports: [EventStoreRepository],
    };
  }
}
