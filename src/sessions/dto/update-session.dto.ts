import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateSessionDto } from './create-session.dto';

export class UpdateSessionDto extends PartialType(CreateSessionDto) {

    @IsString()
    time: string;


    @IsString()
    description: string;
}
