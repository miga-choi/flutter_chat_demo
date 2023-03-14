import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('varchar')
  public name: string;
}
