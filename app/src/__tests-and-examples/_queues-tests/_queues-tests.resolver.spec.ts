import { Test, TestingModule } from '@nestjs/testing';
import { QueuesTestsResolver } from './_queues-tests.resolver';
import { QueuesTestsService } from './_queues-tests.service';

describe('QueuesTestsResolver', () => {
  let resolver: QueuesTestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueuesTestsResolver, QueuesTestsService],
    }).compile();

    resolver = module.get<QueuesTestsResolver>(QueuesTestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
