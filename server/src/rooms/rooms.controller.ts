import { Body, Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async getRooms(@Body('username') username_: string): Promise<Room[]> {
    return this.roomsService.getRooms({ users: { username: username_ } });
  }
}
