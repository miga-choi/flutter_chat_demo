import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { ResponseInterface } from '../common/response.interface';
import { Like } from 'typeorm';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/search/:username')
  async searchUser(
    @Param('username') username_: string,
  ): Promise<ResponseInterface> {
    const result: User[] = await this.usersService.findAllUsers({
      username: Like(`%${username_}%`),
    });
    return { success: true, data: result };
  }

  @Post('/signup')
  async signUp(
    @Body('username')
    username_: string,
    @Body('password')
    password_: string,
  ): Promise<ResponseInterface> {
    try {
      const result = await this.usersService.createUser({
        username: username_,
        password: password_,
      });
      if (!result) {
        throw new ConflictException('Sign up error!');
      }
      return { success: true, data: '' };
    } catch (error_) {
      throw new ConflictException('Username already exists!');
    }
  }

  @Post('/signin')
  async signIn(
    @Body('username')
    username_: string,
    @Body('password')
    password_: string,
  ): Promise<ResponseInterface> {
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
    return { success: true, data: user.access_token };
  }

  @Post('/signout')
  async signOut(
    @Body('token')
    token_: string,
  ): Promise<ResponseInterface> {
    const user: User = await this.usersService.findOneUser({
      access_token: token_,
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    user.access_token = null;
    const result: number = await this.usersService.updateUser(
      { id: user.id },
      user,
    );
    if (result <= 0) {
      throw new ConflictException('Sign out error!');
    }
    return { success: true, data: '' };
  }
}
