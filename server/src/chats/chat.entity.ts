import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('numeric')
  public time: number;

  @ManyToOne(() => User)
  public from: User;

  @ManyToOne(() => Room)
  public to: Room;
}
