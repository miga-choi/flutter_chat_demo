import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  async signUp(
    @Body('username') username_: string,
    @Body('password') password_: string,
  ): Promise<void> {
    try {
      const result = await this.usersService.createUser({
        username: username_,
        password: password_,
      });
      if (!result) {
        throw new ConflictException('Sign up error!');
      }
    } catch (error_) {
      throw new ConflictException('Username already exists!');
    }
  }

  @Post('/signin')
  async signIn(
    @Body('username') username_: string,
    @Body('password') password_: string,
  ): Promise<string> {
    const user: User = await this.usersService.findOneUser({
      username: username_,
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    if (user.password !== password_) {
      throw new NotFoundException('Wrong password!');
    }
    user.access_token = `${new Date().getTime()}_${user.id}`;
    const result: number = await this.usersService.updateUser(
      { id: user.id },
      user,
    );
    if (result <= 0) {
      throw new ConflictException('Sign in error!');
    }
    return user.access_token;
  }
}
