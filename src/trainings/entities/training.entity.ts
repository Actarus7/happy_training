import { Exercise } from "src/exercises/entities/exercises.entity";
import { Session } from "src/sessions/entities/session.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Training {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @OneToMany(() => Session, session => session.trainings)
    sessions: Session[];

    @OneToMany(() => Exercise, exercise => exercise.training)
    exercises: Exercise[];

  /*  @OneToMany(() => Comment, comment => comment.training)
    comments: Comment[];
    */
}
