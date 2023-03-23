import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import Realm from 'realm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServer = app.get<ConfigService>(ConfigService);

  // const realmApp = new Realm.App({
  //   id: configServer.get<string>('realm.apikey'),
  // });
  // const credentials = Realm.Credentials.apiKey(
  //   configServer.get<string>('realm.apikey'),
  // );
  // try {
  //   const user = await realmApp.logIn(credentials);
  //   console.log('Successfully logged in!', user.id);
  //   return user;
  // } catch (err) {
  //   if (err instanceof Error) {
  //     console.error('Failed to log in', err.message);
  //   }
  // }

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
