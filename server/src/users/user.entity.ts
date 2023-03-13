import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
}
