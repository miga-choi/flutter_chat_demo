import { Controller, Post } from '@nestjs/common';
import { ResponseInterface } from '../common/response.interface';

@Controller('chats')
export class ChatsController {
  @Post('/')
  async createChat(): Promise<ResponseInterface> {
    return { success: true, data: null };
  }
}
