import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import configuration from './config/configuration';
import { TypeOrmConfigService } from './config/database.config';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { EventsModule } from './events/events.module';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    EventsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
    RoomsModule,
    ChatsModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
