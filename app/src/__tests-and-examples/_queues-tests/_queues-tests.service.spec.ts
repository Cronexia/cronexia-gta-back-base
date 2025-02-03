import { Test, TestingModule } from '@nestjs/testing';
import { QueuesTestsService } from './_queues-tests.service';

describe('QueuesTestsService', () => {
  let service: QueuesTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueuesTestsService],
    }).compile();

    service = module.get<QueuesTestsService>(QueuesTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
