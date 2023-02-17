import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateFriendshipDto {

    @ApiProperty()
    @IsString()
    @Length(1)
    userReceiver: string;

};
