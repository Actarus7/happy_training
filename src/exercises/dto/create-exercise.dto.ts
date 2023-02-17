import { IsNotEmpty,IsOptional, IsString } from "class-validator";
import { Column } from "typeorm";

export class CreateExerciseDto {
    
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
    content: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    time: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    beginner: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    medium: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    expert: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    rest_time: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    material: string;

    @IsNotEmpty()
    @Column()
    video: string;

    @IsOptional()
    @Column()
    image: string;
}
