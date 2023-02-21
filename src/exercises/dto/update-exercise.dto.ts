import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {


    @IsString()
    title: string;

    @IsString()
    content: string;

    @IsString()
    time: string;

    @IsString()
    beginner: string;

    @IsString()
    medium: string;

    @IsString()
    expert: string;

    @IsString()
    rest_time: string;

    @IsString()
    material: string;

    @IsString()
    video: string;

    @IsString()
    image: string;
}


