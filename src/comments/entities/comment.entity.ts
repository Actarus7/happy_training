import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn  } from "typeorm";
import { Article } from "src/articles/entities/article.entity";

@Entity('comments')
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn({name: 'comment_id '})
    id: number;

    @Column({type: 'text'})
    message: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(type => Article, article => article.comments, {onDelete: 'CASCADE'})
    article: Article;
    


}