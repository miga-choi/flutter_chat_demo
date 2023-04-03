import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Room } from './room.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async getRooms(findOptionsWhere_: FindOptionsWhere<Room>): Promise<Room[]> {
    return this.roomRepository.find({ where: findOptionsWhere_ });
  }
}
