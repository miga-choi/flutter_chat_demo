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

  /********************************************************************************
   ************************************ INSERT ************************************
   ********************************************************************************/
  /**
   * @description insert Room
   * @param username_
   * @param name_
   * @return Room
   */
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

  /********************************************************************************
   ************************************ SELECT ************************************
   ********************************************************************************/
  /**
   * @description select Room list
   * @param findOptionsWhere_
   * @return Room[]
   */
  async getRooms(findOptionsWhere_: FindOptionsWhere<Room>): Promise<Room[]> {
    const result: Room[] = await this.roomRepository.find({
      where: findOptionsWhere_,
    });
    return result;
  }

  /**
   * @description select Room
   * @param findOptionsWhere_
   * @return Room
   */
  async getRoom(findOptionsWhere_: FindOptionsWhere<Room>): Promise<Room> {
    const result: Room = await this.roomRepository.findOne({
      where: findOptionsWhere_,
    });
    return result;
  }
}
