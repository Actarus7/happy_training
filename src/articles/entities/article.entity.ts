import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TypeArticle } from "src/types/enumTypeArticle";
import { Comment } from "src/comments/entities/comment.entity";
import { User } from "src/users/entities/user.entity";



@Entity('articles')
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @Column({ type: 'varchar' })
    title: string;


    @Column({
        type: "enum",
        enum: TypeArticle,
    })
    type: TypeArticle;


    @Column({ type: 'varchar' })
    body: string;


    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;


    @Column({ type: 'boolean', default: false })
    published: boolean;


    @Column({ type: 'int', default: 0 })
    likes: number;//ajouter des likes***


    @OneToMany(type => Comment, comment => comment.article)
    comments: Comment[];


    @ManyToOne(() => User, user => user.articles)
    user: User;
};

