import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServer = app.get<ConfigService>(ConfigService);

  await app.listen(configServer.get<number>('http.port'));
  app.setGlobalPrefix('api');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
