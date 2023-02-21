import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateExerciseDto {

    @IsNotEmpty()
    @IsNumber()
    trainingId: number;

    @IsNotEmpty()
    @IsNumber()
    sessionId: number;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    time: string;

    @IsNotEmpty()
    @IsString()
    beginner: string;

    @IsNotEmpty()
    @IsString()
    medium: string;

    @IsNotEmpty()
    @IsString()
    expert: string;

    @IsNotEmpty()
    @IsString()
    rest_time: string;

    @IsString()
    material: string;

    @IsString()
    @IsOptional()
    video: string;

    @IsString()
    @IsOptional()
    image: string;
}
