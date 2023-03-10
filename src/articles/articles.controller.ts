import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpStatus, UseGuards, Request, ClassSerializerInterceptor } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';




@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly usersService: UsersService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() createArticleDto: CreateArticleDto, @Request() req) {
    Logger.log('create an article', 'ArticlesController');

    // Récupère le User connecté
    const userLogged = await this.usersService.findOneById(req.user.id);



    const article = await this.articlesService.createArticle(createArticleDto, userLogged);

    if (article)
      return article;

    throw new HttpException('Article not created', HttpStatus.BAD_REQUEST);
  };


  @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll() {
    Logger.log('get All articles', 'ArticlesController');

    return await this.articlesService.getArticles();
  };


  @UseGuards(JwtAuthGuard)
  @Get('recettes')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllRecettes() {
    Logger.log('get All articles/recettes', 'ArticlesController');

    return await this.articlesService.getRecettes();
  };



  @UseGuards(JwtAuthGuard)
  @Get('defis')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllDéfis() {
    Logger.log('get All articles/défis', 'ArticlesController');

    return await this.articlesService.getDéfis();
  };



  @UseGuards(JwtAuthGuard)
  @Get('partages')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllPartages() {
    Logger.log('get All articles/partages', 'ArticlesController');

    return await this.articlesService.getPartages();
  };



  @UseGuards(JwtAuthGuard)
  @Get(':articleId')
  @UseInterceptors(ClassSerializerInterceptor)
  async getOne(
    @Param('articleId') articleId: number) {
    Logger.log('get One article', 'ArticlesController');

    const article = await this.articlesService.getOneArticle(articleId);

    if (article)
      return article;

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  };



  @UseGuards(JwtAuthGuard)
  @Patch(':articleId')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    @Param('articleId') articleId,
    @Body() updateArticleDto: UpdateArticleDto) {
    Logger.log('update an article', 'ArticlesController');

    const article = await this.articlesService.updateArticle(articleId, updateArticleDto);

    if (article)
      return article;

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  };



  @UseGuards(JwtAuthGuard)
  @Patch('/published/:articleId')
  @UseInterceptors(ClassSerializerInterceptor)
  async publishedArticle(
    @Param('articleId') articleId: number) {
    Logger.log('update an article', 'ArticlesController');

    const article = await this.articlesService.publishedArticle(articleId);

    if (article)
      return article;

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  };



  /** Suppression d'un article    
   * Nécessite:
   * * d'être connecté/enregistré
   * * que l'Article existe
   * * d'être propriétaire de l'Article ou Admin A FAIRE
   * @param articleId Id de l'Article à supprimer
   * @returns Retourne l'Article supprimé
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':articleId')
  @UseInterceptors(ClassSerializerInterceptor)
  async remove(@Param('articleId') articleId) {
    Logger.log('remove an article', 'ArticlesController');

    /**verifie que l'article existe */
    const article = await this.articlesService.removeArticle(articleId);

    if (article)
      return article;

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  };


};




