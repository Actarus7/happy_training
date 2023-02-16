import { Module } from '@nestjs/common';
import { FrienshipsService } from './frienships.service';
import { FrienshipsController } from './frienships.controller';

@Module({
  controllers: [FrienshipsController],
  providers: [FrienshipsService]
})
export class FrienshipsModule {}
