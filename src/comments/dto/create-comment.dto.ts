import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {

    @IsOptional()
    @IsNumber()
    articleId: number;
  

    @IsOptional()
    @IsNumber()
    trainingId: number;
    
    
    @IsString()
    message: string;
    
};
