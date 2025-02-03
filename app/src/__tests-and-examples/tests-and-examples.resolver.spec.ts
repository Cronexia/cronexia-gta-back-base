import { Test, TestingModule } from '@nestjs/testing';
import { TestsAndExamplesResolver } from './tests-and-examples.resolver';
import { TestsAndExamplesService } from './tests-and-examples.service';

describe('TestsAndExamplesResolver', () => {
  let resolver: TestsAndExamplesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestsAndExamplesResolver, TestsAndExamplesService],
    }).compile();

    resolver = module.get<TestsAndExamplesResolver>(TestsAndExamplesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
