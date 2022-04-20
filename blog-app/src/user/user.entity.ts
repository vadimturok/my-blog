import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../post/post.entity";
import {Comment} from "../comment/commnet.entity";


export enum UserRole{
    ADMIN = 'admin',
    USER = 'user',
    MANAGER = 'manager'
}

@Entity({name: 'users'})
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    email: string

    @Column()
    password: string;

    @Column({type: "enum", enum: UserRole, default: UserRole.USER})
    role: UserRole

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[]
}