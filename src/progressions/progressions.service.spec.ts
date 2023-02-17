import { Test, TestingModule } from '@nestjs/testing';
import { ProgressionsService } from './progressions.service';

describe('ProgressionsService', () => {
  let service: ProgressionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgressionsService],
    }).compile();

    service = module.get<ProgressionsService>(ProgressionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
