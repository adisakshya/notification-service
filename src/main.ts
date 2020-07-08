import { BoomExceptionFilter } from "@common/expection-filter";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {FireBase} from '@common/firebase/firebase';

async function configure() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(app.get(BoomExceptionFilter));
  const options = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription('Internal API documentation for Notification Service')
    .setVersion('1.0.0')
    .build();
  new FireBase().configure();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}

configure();
