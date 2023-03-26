import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signin')
  async signIn(
    @Body('username') username_: string,
    @Res({ passthrough: true }) response_: Response,
  ): Promise<string> {
    try {
      let user = await this.usersService.findOneUser({ username: username_ });
      if (!user) {
        user = await this.usersService.createUser({ username: username_ });
      }
      if (user) {
        user.access_token = `${new Date().getTime()}_${user.id}`;
        const result = await this.usersService.updateUser(
          { id: user.id },
          user,
        );
        if (result > 0) {
          return user.access_token;
        }
      }
      throw new BadRequestException('Sign in Error');
    } catch (error_) {
      response_.status(400).json({ success: false, data: error_.message });
    }
  }
}
