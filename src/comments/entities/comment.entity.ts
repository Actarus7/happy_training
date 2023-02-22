import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Article } from "src/articles/entities/article.entity";
import { Training } from "src/trainings/entities/training.entity";
import { User } from "src/users/entities/user.entity";

@Entity('comments')
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn({ name: 'comment_id ' })
    id: number;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(() => Article, article => article.comments, { onDelete: 'CASCADE' })
    article: Article;

    @ManyToOne(() => Training, training => training.comments, { onDelete: 'CASCADE' })
    training: Training;

    @ManyToOne(() => User, user => user.comments)
    user: User;


};