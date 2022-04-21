import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {User} from "../user/user.entity";
import {Comment} from "../comment/commnet.entity";

@Entity({name: 'posts'})
export class Post{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    text: string;

    @Column()
    dateAndTimePublish: Date

    @Column({default: 0})
    likes: number

    @Column()
    postImage: string;

    @ManyToOne(() => User, (user) => user.posts, {eager: true})
    user: number

    @OneToMany(() => Comment, (comment) => comment.post, {eager: true})
    comments: Comment[]
}