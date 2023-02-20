import { Exercise } from "src/exercises/entities/exercises.entity";
import { Session } from "src/sessions/entities/session.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
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
}
