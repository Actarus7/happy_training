import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { ArticlesService } from 'src/articles/articles.service';
import { TrainingsService } from 'src/trainings/trainings.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, ArticlesService, TrainingsService, UsersService]
})
export class CommentsModule {}
