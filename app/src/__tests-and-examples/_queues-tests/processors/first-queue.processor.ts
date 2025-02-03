import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import {
  ONE_QUEUE_NAME,
  ANOTHER_QUEUE_NAME,
} from '../constants/queues.constant';
import { JobParamsArgs } from '../dtos/job-params.args';
import { JOB_NAMES } from '../enums/job-names.enum';
import { WorkerHostProcessor } from './custom-logs/worker-host.processor';

@Processor(ONE_QUEUE_NAME)
@Injectable()
export class FirstQueueProcessor extends WorkerHostProcessor {
  process(job: Job<JobParamsArgs, number, string>): Promise<number> {
    const { num, num2 } = job.data;
    switch (job.name) {
      case JOB_NAMES.SUM:
        return Promise.resolve(num + num2);
      case JOB_NAMES.SUBTRACT:
        return Promise.resolve(num - num2);
      case JOB_NAMES.MULTIPLY:
        return Promise.resolve(num * num2);
      case JOB_NAMES.DIVISION:
        if (num2 === 0) {
          throw new BadRequestException('Division by zero error');
        }
        return Promise.resolve(num / num2);
    }
    throw new BadRequestException(`Unknown job name: ${job.name}`);
  }
}
