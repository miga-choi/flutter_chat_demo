import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;

  @OneToOne(() => User)
  @JoinColumn()
  public from: string;

  @OneToOne(() => Room)
  @JoinColumn()
  public to: string;

  @ManyToMany(() => User)
  @JoinTable()
  public users: User[];
}
