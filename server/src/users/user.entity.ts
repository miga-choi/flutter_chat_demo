import { Chat } from 'src/chats/chat.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @OneToMany(() => Chat, (chat) => chat.from)
  public chats: Chat[];
}
