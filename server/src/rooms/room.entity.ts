import { Chat } from 'src/chats/chat.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @OneToMany(() => Chat, (chat) => chat.to)
  chats: Chat[];

  @ManyToMany(() => User)
  @JoinTable({ name: 'room_users' })
  users: User[];
}
