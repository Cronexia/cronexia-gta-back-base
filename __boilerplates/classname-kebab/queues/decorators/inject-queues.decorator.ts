import { InjectQueue } from '@nestjs/bullmq';
import {
  COUNTER_EXEC,
} from '../constants/queues.constant';

export const InjectCounterExecQueue = () => InjectQueue(COUNTER_EXEC);
