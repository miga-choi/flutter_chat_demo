import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomsGateway } from './room.gateway';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, User]), UsersModule],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway],
})
export class RoomsModule {}
