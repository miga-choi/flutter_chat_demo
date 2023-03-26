import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user_: User): Promise<User> {
    const user: User = this.usersRepository.create(user_);
    const result: User = await this.usersRepository.save(user);
    return result;
  }

  async findAllUsers(match_: FindOptionsWhere<User>): Promise<User[]> {
    const result: User[] = await this.usersRepository.find({ where: match_ });
    return result;
  }

  async findOneUser(match_: FindOptionsWhere<User>): Promise<User> {
    const result: User = await this.usersRepository.findOneBy(match_);
    return result;
  }

  async updateUser(
    match_: FindOptionsWhere<User>,
    user_: User,
  ): Promise<number> {
    const result: UpdateResult = await this.usersRepository.update(
      match_,
      user_,
    );
    return result.affected;
  }

  async remove(userId: string): Promise<number> {
    const result: DeleteResult = await this.usersRepository.delete({
      id: userId,
    });
    return result.affected;
  }
}
