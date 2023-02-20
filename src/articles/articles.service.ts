import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {


  async getArticles() {
    return await Article.find();
  };


  async getOneArticle(articleId: number) {
    const article = await Article.findOneBy({ id: articleId });

    if (article)
      return article;

    return undefined;
  };

  /** Création d'un nouvel article */
  async createArticle(createArticleDto: CreateArticleDto) {
    const newArticle = new Article();

    newArticle.body = createArticleDto.body;
    newArticle.title = createArticleDto.title;
    newArticle.type = createArticleDto.type;

    newArticle.save();

    return newArticle;
  };


  async updateArticle(articleId: number, updateArticleDto: UpdateArticleDto) {
    const article = await Article.findOneBy({ id: articleId });

    article.body = updateArticleDto.body;
    article.title = updateArticleDto.title;

    await article.save();

    return await Article.findOneBy({ id: articleId });
  };



  /** Créer une nouvelle méthode pour passer le "published" en true */

  async publishedArticle(id: number) {
    const publishedArticle = await Article.findOneBy({ id });

    publishedArticle.published = true;

    await publishedArticle.save();

    return publishedArticle;

  };



  async removeArticle(articleId: number) {
    const deleteArticle = await Article.findOneBy({ id: articleId });

    await deleteArticle.remove();

    return deleteArticle;
  };

};