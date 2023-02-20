import { IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateTrainingDto {

    @IsNotEmpty()
    @Column()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    @Column()
    description: string;
}
