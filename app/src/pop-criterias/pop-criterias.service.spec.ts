import { Test, TestingModule } from '@nestjs/testing';
import { PopCriteriasService } from './pop-criterias.service';

describe('PopCriteriasService', () => {
  let service: PopCriteriasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopCriteriasService],
    }).compile();

    service = module.get<PopCriteriasService>(PopCriteriasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
