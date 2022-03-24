import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    JoinTable,
    OneToOne,
    BaseEntity,
    OneToMany,
    ManyToMany
} from "typeorm";
import {Profile} from "./Profile";
import {Post} from "../entry/Post";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default: false})
    isStaff: boolean = false;

    @Column({type: 'date'})
    createdAt: string = (new Date()).toISOString();

    @OneToOne(
        () => Profile,
        profile => profile.user,
        {onDelete: "CASCADE", nullable: true}
    )
    @JoinColumn()
    profile: Promise<Profile> | Profile

    @OneToMany(
        () => Post,
        post => post.user,
    )
    @JoinColumn()
    posts: Promise<Post[]> | Post[]

    @ManyToMany(
        () => User,
        user => user.following
    )
    @JoinTable()
    followers: User[]

    @ManyToMany(
        () => User,
        user => user.followers
    )
    following: User[]
}
