import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Logger, UseGuards } from '@nestjs/common';
import { ArticlesService } from 'src/articles/articles.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly articlesService: ArticlesService) { }




  @Get()
  async getAll() {
    Logger.log('get all comments', 'commentsController');

    return await this.commentsService.getComments();
  }




  @Get(':commentId')
  async getOne(@Param('commentId') commentId: number) { 
    Logger.log('get one comment', 'commentsController');

    const comment = await this.commentsService.getOneComment(commentId);

    if (comment)
      return comment;

    throw new NotFoundException('Comment not found');
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {

    // Vérifie si le Comment existe
    const updateComment = await this.commentsService.getOneComment(+id);

    if (!updateComment) {
      throw new NotFoundException("Comment Id inconnu");
    };

    // Modifie le Comment
    return await this.commentsService.updateComment(+id, updateCommentDto);
  };





/**
 * 
 * @param id Id du Comment à supprimer
 * @returns Retourne le Comment supprimé
 */

@UseGuards(JwtAuthGuard)  
@Delete(':id')
  async remove(@Param('id') id: number) {
    Logger.log('delete a comment', 'commentsController');
    //verifie si le Comment existe
    const removeComment = await this.commentsService.getOneComment(+id);

    if (!removeComment) {
      throw new NotFoundException("Comment Id inconnu");
    };

    // Supprime le Comment

    return await this.commentsService.removeComment(+id);
  };



/** Création d'un nouveau Comment   
 * Nécessite : 
 * * d'être connecté/enregistré
 * * que l'Article associé existe
 */
@UseGuards(JwtAuthGuard) 
@Post()
  async createComment(@Body() createCommentDto: CreateCommentDto) {


    // Vérifier l'existence de l'article
    const article = await this.articlesService.getOneArticle(createCommentDto.articleId);

    if (!article) {
      throw new NotFoundException('Article not found');
    };

    return await this.commentsService.createComment(createCommentDto, article);

  };
}

