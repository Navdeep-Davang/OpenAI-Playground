import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 5000;
  const logger = new Logger('Bootstrap');
  logger.log(`App is starting on port ${port}`);
  await app.listen(port);
 
}

bootstrap();
