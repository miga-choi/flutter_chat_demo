import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user_: User) {
    const user = this.usersRepository.create(user_);
    await this.usersRepository.save(user);
    return user;
  }

  async findAllUsers(match_: FindOptionsWhere<User>): Promise<User[]> {
    return this.usersRepository.find({ where: match_ });
  }

  async findOneUser(match_: FindOptionsWhere<User>): Promise<User> {
    return this.usersRepository.findOneBy(match_);
  }

  async remove(userId: string): Promise<void> {
    this.usersRepository.delete({ id: userId });
  }
}
