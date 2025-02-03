import { Test, TestingModule } from '@nestjs/testing';
import { PopCritValuesService } from './pop-crit-values.service';

describe('PopCritValuesService', () => {
  let service: PopCritValuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopCritValuesService],
    }).compile();

    service = module.get<PopCritValuesService>(PopCritValuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
