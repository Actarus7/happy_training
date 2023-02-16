import { Column, PrimaryGeneratedColumn } from "typeorm";

export class CreateTrainingDto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;
}
