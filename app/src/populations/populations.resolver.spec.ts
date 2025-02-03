import { Test, TestingModule } from '@nestjs/testing';
import { PopulationsResolver } from './populations.resolver';
import { PopulationsService } from './populations.service';

describe('PopulationsResolver', () => {
  let resolver: PopulationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopulationsResolver, PopulationsService],
    }).compile();

    resolver = module.get<PopulationsResolver>(PopulationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
