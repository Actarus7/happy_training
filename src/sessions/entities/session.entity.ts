import { Exercise } from "src/exercises/entities/exercice.entity";
import { Training } from "src/trainings/entities/training.entity";
import { Column, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    time: string;

    @ManyToOne(() => Training, training => training.sessions)
    trainings: Training;

    @ManyToOne(() => Exercise)
    @JoinTable()
    exercises: Exercise[];
}
