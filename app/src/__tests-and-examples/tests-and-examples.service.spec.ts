import { Test, TestingModule } from '@nestjs/testing';
import { TestsAndExamplesService } from './tests-and-examples.service';

describe('TestsAndExamplesService', () => {
  let service: TestsAndExamplesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestsAndExamplesService],
    }).compile();

    service = module.get<TestsAndExamplesService>(TestsAndExamplesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
