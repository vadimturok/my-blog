import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";

@Entity({name: 'tokens'})
export class Token{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    refreshToken: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User
}