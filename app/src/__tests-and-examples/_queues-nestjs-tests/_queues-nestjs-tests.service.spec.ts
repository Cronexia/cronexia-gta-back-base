import { Test, TestingModule } from '@nestjs/testing';
import { QueuesNestjsTestsService } from './_queues-nestjs-tests.service';

describe('QueuesNestjsTestsService', () => {
  let service: QueuesNestjsTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueuesNestjsTestsService],
    }).compile();

    service = module.get<QueuesNestjsTestsService>(QueuesNestjsTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
