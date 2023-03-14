import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(userId_: string): Promise<User> {
    return this.usersRepository.findOneBy({ id: userId_ });
  }

  async remove(userId: string): Promise<void> {
    this.usersRepository.delete({ id: userId });
  }
}
