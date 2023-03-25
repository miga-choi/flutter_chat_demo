import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signin')
  async signIn(@Body('username') username_: string): Promise<User> {
    let user = await this.usersService.findOneUser({ username: username_ });
    let access_token: string;
    if (!user) {
      user = await this.usersService.createUser({ username: username_ });
    }

    if (user) {
      access_token = `${new Date().getTime()}_${user.id}`;
    }

    return user;
  }
}
