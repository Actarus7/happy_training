import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, HttpStatus, Put } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';




@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }



  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {Logger.log('create an article', 'ArticlesController');

    const article = await this.articlesService.createArticle(createArticleDto);

    if (article)
      return article;

    throw new HttpException('Article not created', HttpStatus.BAD_REQUEST);
  };



  @Get()
  async getAll() {Logger.log('get All articles', 'ArticlesController');

    return await this.articlesService.getArticles();
  };



  @Get(':articleId')
  async getOne(
    @Param('articleId') articleId: number) 
    {Logger.log('get One article', 'ArticlesController');

    const article = await this.articlesService.getOneArticle(articleId);

    if (article)
      return article;

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  };



  @Patch(':articleId')
  async update(
    @Param('articleId') articleId, 
    @Body() updateArticleDto: UpdateArticleDto) 
    {Logger.log('update an article','ArticlesController');

    const article = await this.articlesService.updateArticle(articleId, updateArticleDto);

    if (article)
      return article;

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  };

  @Patch('/published/:articleId')
  async publishedArticle(
    @Param('articleId') articleId: number) 
    {Logger.log('update an article','ArticlesController');

    const article = await this.articlesService.publishedArticle(articleId);

    if (article)
      return article;

    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  };




  @Delete(':articleId')
  async remove(
    @Param('articleId') articleId) 
    {Logger.log('remove an article', 'ArticlesController');

    const article = await this.articlesService.removeArticle(articleId);

    if (article)
      return article;
      
    throw new HttpException('Article not found', HttpStatus.NOT_FOUND);
  };

  /* @Post('comment')
  async addComment(@Param('articleId') articleId, @Body() createCommentDto: CreateCommentDto){
    const comment = await this.articlesService.addCommentToArticle(articleId, createCommentDto);
    if(comment)
    return comment;
  } */
  
};


