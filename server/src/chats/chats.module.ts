import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { RoomsGateway } from '../rooms/room.gateway';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, RoomsGateway],
})
export class ChatsModule {}
