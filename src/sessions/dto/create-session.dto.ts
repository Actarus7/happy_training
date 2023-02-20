import { IsNotEmpty } from "class-validator";
import { IsString } from "class-validator";
import { Column } from "typeorm";


export class CreateSessionDto {
        
    @IsNotEmpty()
    @Column()
    id: number;

    @IsNotEmpty()
    @IsString()
    @Column()
    description: string;

    @IsNotEmpty()
    @Column()
    time: string;
}
