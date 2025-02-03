import { Test, TestingModule } from '@nestjs/testing';
import { QueuesNestjsTestsResolver } from './_queues-nestjs-tests.resolver';
import { QueuesNestjsTestsService } from './_queues-nestjs-tests.service';

describe('QueuesNestjsTestsResolver', () => {
  let resolver: QueuesNestjsTestsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueuesNestjsTestsResolver, QueuesNestjsTestsService],
    }).compile();

    resolver = module.get<QueuesNestjsTestsResolver>(QueuesNestjsTestsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
