import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "../post/post.entity";

@Entity({name: 'tags'})
export class Tag{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column()
    description: string;
}