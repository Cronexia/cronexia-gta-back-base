import { Test, TestingModule } from '@nestjs/testing';
import { PopCriteriasResolver } from './pop-criterias.resolver';
import { PopCriteriasService } from './pop-criterias.service';

describe('PopCriteriasResolver', () => {
  let resolver: PopCriteriasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopCriteriasResolver, PopCriteriasService],
    }).compile();

    resolver = module.get<PopCriteriasResolver>(PopCriteriasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
