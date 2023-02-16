import { Column, PrimaryGeneratedColumn } from "typeorm";


export class CreateSessionDto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    time: string;
}
