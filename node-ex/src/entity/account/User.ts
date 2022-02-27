import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: false })
  isStaff: boolean = false;

  @Column({ type: 'date' })
  createdAt: string = (new Date()).toISOString();
}