import { BoomExceptionFilter } from "@common/expection-filter";
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {FireBase} from '@common/firebase/firebase';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function configure() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.REDIS,
    options: {
      url: 'http://192.168.99.100:6379',
    }
  });
  app.useGlobalFilters(app.get(BoomExceptionFilter));
  new FireBase().configure();
  await app.listen(() => console.log('Notification Service is active...'));
}

configure();
