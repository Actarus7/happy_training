import { Exercise } from "src/exercises/entities/exercises.entity";
import { Training } from "src/trainings/entities/training.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Session extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    time: string;

    @ManyToOne(() => Training, training => training.sessions)
    training: Training;

    @OneToMany(() => Exercise, exercise => exercise.session)
    exercises: Exercise[];
}
