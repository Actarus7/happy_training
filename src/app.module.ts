import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingsModule } from './trainings/trainings.module';
import { Training } from './trainings/entities/training.entity';
import { SessionsModule } from './sessions/sessions.module';
import { Session } from './sessions/entities/session.entity';
import { ExercisesModule } from './exercises/exercises.module';
import { Exercise } from './exercises/entities/exercises.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { Friendship } from './friendships/entities/friendship.entity';
import { ArticlesModule } from './articles/articles.module';
import { Article } from './articles/entities/article.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { ImagesModule } from './images/images.module';
import { Image } from './images/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ServeStaticModule } from '@nestjs/serve-static/dist';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT!,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Friendship, Training, Session, Exercise, Article, Comment, Image],
      synchronize: true,
    }),
    MulterModule.register({
        dest: './upload',
    }),
   
      ServeStaticModule.forRoot({
        rootPath: join(__dirname, `..`, `upload`)
      }),
    TrainingsModule,
    SessionsModule,
    ExercisesModule,
    UsersModule,
    AuthModule, 
    FriendshipsModule,
    TrainingsModule,
    SessionsModule,
    ExercisesModule,
    ArticlesModule,
    CommentsModule,
    ImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, {provide: APP_PIPE, useClass: ValidationPipe}
  
  ]
})
export class AppModule { }
