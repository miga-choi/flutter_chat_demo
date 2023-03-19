import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServer = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('/api');
  await app.listen(configServer.get<number>('http.port'));
  console.log(
    `Application is running on: ${configServer.get<string>(
      'http.ssl',
    )}://${configServer.get<string>('http.domain')}:${configServer.get<string>(
      'http.port',
    )}`,
  );
}
bootstrap();
