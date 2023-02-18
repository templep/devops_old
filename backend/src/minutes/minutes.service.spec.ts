import { Test, TestingModule } from '@nestjs/testing';
import { MinutesService } from './minutes.service';

describe('MinutesService', () => {
  let service: MinutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinutesService],
    }).compile();

    service = module.get<MinutesService>(MinutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
