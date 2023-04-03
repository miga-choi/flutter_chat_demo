import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createRoom(username_: string, name_: string): Promise<Room> {
    const user: User = await this.userRepository.findOneBy({
      username: username_,
    });
    const room: Room = this.roomRepository.create({
      name: name_,
      users: [user],
    });
    const result: Room = await this.roomRepository.save(room);
    return result;
  }

  async getRooms(findOptionsWhere_: FindOptionsWhere<Room>): Promise<Room[]> {
    const result: Room[] = await this.roomRepository.find({
      where: findOptionsWhere_,
    });
    return result;
  }
}
