import {BoomExceptionFilter} from "@common/expection-filter";
import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Transport} from "@nestjs/microservices";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function configure() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(app.get(BoomExceptionFilter));
  const options = new DocumentBuilder()
        .setTitle('Notification Service')
        .setDescription('Internal API documentation for Notification Service')
        .setVersion('1.0.0')
        .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}

configure();
