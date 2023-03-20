import { Body, Controller, Post } from '@nestjs/common';

@Controller('/users')
export class UsersController {
  @Post('/signin')
  async createUser(@Body('username') username_: string): Promise<void> {
    console.log(username_);
  }
}
