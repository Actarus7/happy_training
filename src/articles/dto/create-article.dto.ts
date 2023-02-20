import { TypeArticle } from "src/types/enumTypeArticle";


export class CreateArticleDto {

    title: string;

    type: TypeArticle;

    body: string;

    createdAt: Date;

    published: boolean;

    likes: number;

}
