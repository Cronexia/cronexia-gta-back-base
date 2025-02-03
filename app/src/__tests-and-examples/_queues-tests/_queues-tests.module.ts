import { Module } from '@nestjs/common';
import { QueuesTestsService } from './_queues-tests.service';
import { QueuesTestsResolver } from './_queues-tests.resolver';

import { QueuesModule } from '../../_queues/queues.module';
import {
  ONE_QUEUE_NAME,
  ANOTHER_QUEUE_NAME,
} from './constants/queues.constant';
import {
  MATH_ARRAY_PRODUCER,
  MATH_ARRAY_CHILD,
  MATH_ARRAY_MERGE,
} from './constants/flows.constant';
import { FirstQueueProcessor } from './processors/first-queue.processor';
import { MathArrayChildProcessor } from './processors/math-array-child.processor';
import { MathArrayMergeProcessor } from './processors/math-array-merge.processor';

@Module({
  imports: [
    QueuesModule.register({
      // On passe des strings, qui servent de référence
      queues: [
        ONE_QUEUE_NAME,
        ANOTHER_QUEUE_NAME,
        MATH_ARRAY_CHILD,
        MATH_ARRAY_MERGE,
      ],
      flows: [MATH_ARRAY_PRODUCER],
    }),
  ],
  providers: [
    QueuesTestsResolver,
    QueuesTestsService,
    FirstQueueProcessor,
    MathArrayChildProcessor,
    MathArrayMergeProcessor,
  ],
})
export class QueuesTestsModule {}
