import { Session } from "src/sessions/entities/session.entity";
import { Training } from "src/trainings/entities/training.entity";
import { BaseEntity, Column, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Exercise extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    time: string;

    @Column()
    beginner: string;

    @Column()
    medium: string;

    @Column()
    expert: string;

    @Column()
    rest_time: string;

    @Column()
    material: string;

    @Column()
    video: string;

    @Column()
    image: string;

    @ManyToOne(() => Training, training => training.exercises)
    training: Training;

    @ManyToOne(() => Session, session=> session.exercises)
    session: Session;

}
