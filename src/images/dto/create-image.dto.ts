import { IsNumber, IsString } from "class-validator";


export class CreateImageDto {

    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    pseudoUser: string;
}
