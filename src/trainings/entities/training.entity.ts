import { Exercise } from "src/exercises/entities/exercise.entity";
import { Session } from "src/sessions/entities/session.entity";
import { BaseEntity, Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Training extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Session, session => session.training)
    sessions: Session[];

    @OneToMany(() => Exercise, exercise => exercise.training)
    exercises: Exercise[];

  /*  @OneToMany(() => Comment, comment => comment.training)
    comments: Comment[];
    */
};