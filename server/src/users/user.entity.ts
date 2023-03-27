import { Chat } from 'src/chats/chat.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id?: string;

  @Column('varchar', { unique: true })
  public username: string;

  @Column('varchar')
  public password: string;

  @Column({ type: 'varchar', nullable: true })
  public access_token?: string;

  @OneToMany(() => Chat, (chat) => chat.from)
  public chats?: Chat[];
}
