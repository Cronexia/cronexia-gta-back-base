import { InjectQueue } from '@nestjs/bullmq';
import {
  ONE_QUEUE_NAME,
  ANOTHER_QUEUE_NAME,
} from '../constants/queues.constant';

export const InjectFirstQueue = () => InjectQueue(ONE_QUEUE_NAME);
export const InjectSecondQueue = () => InjectQueue(ANOTHER_QUEUE_NAME);
