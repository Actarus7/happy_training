import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @Length(1)
    pseudo: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    @Length(4)
    @IsBoolean()
    admin: number;

    @ApiProperty()
    @IsUrl()
    photo: string;

    @ApiProperty()
    @IsString()
    @Length(1)
    //@Transform()
    city: string;

    @ApiProperty()
    @IsOptional()
    description: string;





    




};
