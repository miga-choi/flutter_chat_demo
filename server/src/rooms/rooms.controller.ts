import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createRoom(
    @Body('username') username_: string,
    @Body('name') name_: string,
  ): Promise<Room> {
    const result: Room = await this.roomsService.createRoom(username_, name_);
    return result;
  }

  @Get()
  async getRooms(@Body('username') username_: string): Promise<Room[]> {
    const result: Room[] = await this.roomsService.getRooms({
      users: { username: username_ },
    });
    return result;
  }

  @Get(':roomId')
  async getRoom(@Param('roomId') roomId_: string): Promise<Room> {
    const result: Room = await this.roomsService.getRoom({
      id: roomId_,
    });
    return result;
  }
}
