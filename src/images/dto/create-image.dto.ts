import { IsString } from "class-validator";


export class CreateImageDto {
    
    @IsString()
    originalName: string;

    @IsString()
    fileName: string;

    @IsString()
    mimeType: string;
}
