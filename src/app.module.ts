import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FriendshipsModule } from './friendships/friendships.module';
import { User } from './users/entities/user.entity';
import { Friendship } from './friendships/entities/friendship.entity';
import { TrainingsModule } from './trainings/trainings.module';
import { SessionsModule } from './sessions/sessions.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ProgressionsModule } from './progressions/progressions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Friendship],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    FriendshipsModule,
    TrainingsModule,
    SessionsModule,
    ExercisesModule,
    ProgressionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
