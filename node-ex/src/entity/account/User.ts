import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default: true})
    is_staff: boolean;

    @Column({type: 'date'})
    createdAt: string =(new Date()).toISOString();
}
