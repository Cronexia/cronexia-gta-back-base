import { Test, TestingModule } from '@nestjs/testing';
import { PopCritValuesResolver } from './pop-crit-values.resolver';
import { PopCritValuesService } from './pop-crit-values.service';

describe('PopCritValuesResolver', () => {
  let resolver: PopCritValuesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopCritValuesResolver, PopCritValuesService],
    }).compile();

    resolver = module.get<PopCritValuesResolver>(PopCritValuesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
