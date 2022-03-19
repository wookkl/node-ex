import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

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
