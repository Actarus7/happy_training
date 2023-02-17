import { Exercise } from "src/exercises/entities/exercise.entity";
import { Training } from "src/trainings/entities/training.entity";
import { BaseEntity, Column, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

};