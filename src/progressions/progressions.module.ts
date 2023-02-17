import { Module } from '@nestjs/common';
import { ProgressionsService } from './progressions.service';
import { ProgressionsController } from './progressions.controller';

@Module({
  controllers: [ProgressionsController],
  providers: [ProgressionsService]
})
export class ProgressionsModule {}
