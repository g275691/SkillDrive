import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express = require('express');
const path = require('path');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/static', express.static('uploads'))
  
  await app.listen(8000);
}
bootstrap();
