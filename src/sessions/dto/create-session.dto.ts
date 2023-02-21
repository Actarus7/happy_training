import { IsNotEmpty, IsNumber } from "class-validator";
import { IsString } from "class-validator";
import { Column } from "typeorm";


export class CreateSessionDto {

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    time: string;

    @IsNotEmpty()
    @IsNumber()
    trainingId: number;

}
