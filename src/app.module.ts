import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingsModule } from './trainings/trainings.module';
import { SessionsModule } from './sessions/sessions.module';
import { ExercicesModule } from './exercices/exercices.module';

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
      entities: [join(__dirname, '*', '.entity.{ts,js}')],
      synchronize: true,
    }),
    TrainingsModule,
    SessionsModule,
    ExercicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
