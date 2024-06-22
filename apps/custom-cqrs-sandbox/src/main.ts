import 'reflect-metadata';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

initializeTransactionalContext();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (error) {
    console.log('Application error: ', error);
    process.exit(1);
  }
}
bootstrap();
