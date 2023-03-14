import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";


export class GetUserSearchDto {

    @ApiProperty()
    @IsString()
    @Length(1)
    search: string

}