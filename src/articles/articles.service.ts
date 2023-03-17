import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { TypeArticle } from 'src/types/enumTypeArticle';
import { User } from 'src/users/entities/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';


@Injectable()
export class ArticlesService {


  async getArticles() {
    return await Article.find({ relations: ['comments', 'user'] });
  };


  // Récupère tous les Articles de Type Recette
  async getRecettes() {
    return await Article.find({ relations: ['comments', 'user'], where: { type: TypeArticle.RECETTE } });
  };


  // Récupère tous les Articles de Type Défi
  async getDéfis() {
    return await Article.find({ relations: { comments: true }, where: { type: TypeArticle.DEFI } });
  };


  // Récupère tous les Articles de Type Partage
  async getPartages() {
    return await Article.find({ relations: ['comments', 'user'], where: { type: TypeArticle.PARTAGE } });
  };


  async getOneArticle(articleId: number) {
    const article = await Article.findOne({ relations: { comments: { user: true } }, where: { id: articleId } });

    if (article)
      return article;

    return undefined;
  };


  /** Création d'un nouvel article */
  async createArticle(createArticleDto: CreateArticleDto, userLogged: User) {

    const newArticle = new Article();

    newArticle.body = createArticleDto.body;
    newArticle.title = createArticleDto.title;
    newArticle.type = createArticleDto.type;
    newArticle.user = userLogged;


    newArticle.save();

    return newArticle;
  };


  async updateArticle(articleId: number, updateArticleDto: UpdateArticleDto) {
    const article = await Article.findOneBy({ id: articleId });

    article.body = updateArticleDto.body;
    article.title = updateArticleDto.title;

    await article.save();

    return await Article.find({ relations: ['user', 'comments'], where: { id: articleId } });
  };



  /** Créer une nouvelle méthode pour passer le "published" en true */
  async publishedArticle(id: number) {
    const publishedArticle = await Article.findOneBy({ id });

    publishedArticle.published = true;

    await publishedArticle.save();

    return publishedArticle;

  };



  async removeArticle(articleId: number) {

    // Vérifie si l'Article à supprimer existe
    const deletedArticle = await Article.findOneBy({ id: articleId });

    if (!deletedArticle) {
      throw new NotFoundException("Article Id inconnu");
    };

    // Suppression de tous les Comments liés à l'Article (pour éviter la contrainte de clé étrangère)



    await deletedArticle.remove();

    return deletedArticle;
  };

};