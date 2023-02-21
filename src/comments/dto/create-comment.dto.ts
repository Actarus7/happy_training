import { IsNumber, IsString } from "class-validator";

export class CreateCommentDto {


    @IsNumber()
    articleId: number;
  

    @IsString()
    message: string;
    
};
