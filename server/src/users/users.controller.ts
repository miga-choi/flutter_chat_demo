import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('/users')
export class UsersController {
  @Post('/signin')
  async createUser(@Body('username') username_: string): Promise<void> {
    console.log(username_);
  }
}
