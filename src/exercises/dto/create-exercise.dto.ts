import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateExerciseDto {
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
}
