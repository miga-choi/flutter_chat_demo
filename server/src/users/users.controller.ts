import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signin')
  async createUser(
    @Body('username') username_: string,
    @Res({ passthrough: true }) response_: Response,
  ): Promise<void> {
    console.log(username_);
    this.usersService.findOne('');
    response_.send('done');
  }
}
