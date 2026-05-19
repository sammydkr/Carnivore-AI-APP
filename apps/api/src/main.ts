import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3000);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: true,
  });

  await app.listen(port);
  console.log(`Ketovore API is running on http://localhost:${port}/api/v1`);
}

void bootstrap();
