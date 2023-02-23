import { ApiProperty } from "@nestjs/swagger";
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
    @IsBoolean()
    admin: number;


    @ApiProperty()
    @IsOptional()
    @IsUrl()
    photo: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Length(1)
    //@Transform()
    city: string;


    @ApiProperty()
    @IsOptional()
    description: string;


};
