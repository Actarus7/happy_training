import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateImageDto {

    @IsNumber()
    id: number

    @IsNotEmpty()
    pseudoUser: string
}
