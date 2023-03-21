import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

@Module({
  providers: [ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
