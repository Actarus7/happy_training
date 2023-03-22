import { IsNotEmpty, IsNumber } from "class-validator";


export class SearchExercisesDto {

    @IsNotEmpty()
    @IsNumber()
    sessionId: number;

    @IsNotEmpty()
    @IsNumber()
    trainingId: number;
};