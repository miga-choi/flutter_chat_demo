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
    private readonly usersRepository: Repository<User>,
  ) {}

  /********************************************************************************
   ************************************ INSERT ************************************
   ********************************************************************************/
  /**
   * @description Create User
   * @param user_ :User
   * @return User
   */
  async createUser(user_: User): Promise<User> {
    const user: User = this.usersRepository.create(user_);
    const result: User = await this.usersRepository.save(user);
    return result;
  }

  /********************************************************************************
   ************************************ SELECT ************************************
   ********************************************************************************/
  /**
   * @description Select multiple Users
   * @param match_ FindOptionsWhere<User>
   * @return User[]
   */
  async findAllUsers(
    match_: FindOptionsWhere<User> | FindOptionsWhere<User>[],
  ): Promise<User[]> {
    const result: User[] = await this.usersRepository
      .createQueryBuilder()
      .where(match_[0])
      .andWhere(match_[1])
      .getMany();
    return result;
  }

  /**
   * @description Select single User
   * @param match_ FindOptionsWhere<User>
   * @return User User
   */
  async findOneUser(match_: FindOptionsWhere<User>): Promise<User> {
    const result: User = await this.usersRepository.findOneBy(match_);
    return result;
  }

  /********************************************************************************
   ************************************ UPDATE ************************************
   ********************************************************************************/
  /**
   * @description Update User
   * @param match_ FindOptionsWhere<User>
   * @param user_ User
   * @return number
   */
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

  /********************************************************************************
   ************************************ DELETE ************************************
   ********************************************************************************/
  /**
   * @description Delete User
   * @param userId_ string
   * @return number
   */
  async deleteUser(userId_: string): Promise<number> {
    const result: DeleteResult = await this.usersRepository.delete({
      id: userId_,
    });
    return result.affected;
  }
}
