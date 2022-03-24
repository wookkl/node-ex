import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, BaseEntity} from "typeorm";
import {Profile} from "./Profile";


@Entity()
export class User extends BaseEntity{
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

    @OneToOne(
    () => Profile,
    profile => profile.user,
    {onDelete: "CASCADE", nullable: true}
    )
    @JoinColumn()
    profile: Promise<Profile> | Profile
}
