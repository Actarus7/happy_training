import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingsModule } from './trainings/trainings.module';
import { SessionsModule } from './sessions/sessions.module';
import { ExercisesModule } from './exercises/exercises.module';
import { Training } from './trainings/entities/training.entity';
import { Session } from './sessions/entities/session.entity';
import { Exercise } from './exercises/entities/exercises.entity';

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
      entities: [Training, Session, Exercise],
      synchronize: true,
      logging: true
    }),
    TrainingsModule,
    SessionsModule,
    ExercisesModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
