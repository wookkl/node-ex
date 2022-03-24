import {PrimaryGeneratedColumn, Column, OneToOne, BaseEntity, Entity} from "typeorm";
import { User } from './User'
import {JoinColumn} from "typeorm";


@Entity()
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: Promise<User> | User

    @Column()
    email: string;

    @Column()
    nickname: string;

    @Column({type: "integer"})
    age: number;

    @Column({type: "text"})
    introduction: string;
}