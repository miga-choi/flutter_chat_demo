import { Module } from '@nestjs/common';
import { DefaultGateway } from './default.gateway';
import { RoomsGateway } from './rooms.gateway';

@Module({
  providers: [DefaultGateway, RoomsGateway],
})
export class EventsModule {}
