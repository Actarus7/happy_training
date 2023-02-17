import { Test, TestingModule } from '@nestjs/testing';
import { ProgressionsController } from './progressions.controller';
import { ProgressionsService } from './progressions.service';

describe('ProgressionsController', () => {
  let controller: ProgressionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgressionsController],
      providers: [ProgressionsService],
    }).compile();

    controller = module.get<ProgressionsController>(ProgressionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
