import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService, UsersService]
})
export class ArticlesModule { }
