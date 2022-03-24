import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../account/User";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn()
    user: Promise<User> | User;

    @Column()
    title: string;

    @Column({type: "text"})
    content: string;

    @Column({type: "date"})
    createdAt: string = (new Date()).toISOString();
}