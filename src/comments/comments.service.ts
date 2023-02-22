import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from 'src/articles/dto/create-article.dto';
import { Article } from 'src/articles/entities/article.entity';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Training } from 'src/trainings/entities/training.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {

  async getComments() {
    return await Comment.find({ relations: ['article', 'training', 'user'] });
  };



  async getOneComment(id: number) {
    const comment = await Comment.findOneBy({ id });

    if (comment)
      return comment;

    return undefined;

  };



  async createComment(createCommentDto: CreateCommentDto, articleOrTraining: Article | Training, user: User) {
    const newComment = new Comment();

    newComment.message = createCommentDto.message;
    newComment.user = user;

    if (articleOrTraining instanceof Article) {
      newComment.article = articleOrTraining;
    }

    else if (articleOrTraining instanceof Training) {
      newComment.training = articleOrTraining;
    };

    await newComment.save();

    return newComment;
  };



  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {

    const comment = await Comment.findOneBy({ id });

    comment.message = updateCommentDto.message;

    await comment.save();

    return await Comment.findOneBy({ id });
  };




  async removeComment(id: number) {
    const deleteArticle = await Comment.findOneBy({ id });

    await deleteArticle.remove();

    return deleteArticle;
  };

};

