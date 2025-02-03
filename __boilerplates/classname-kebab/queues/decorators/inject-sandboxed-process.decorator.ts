import { InjectQueue } from '@nestjs/bullmq';
import {
  COUNTER_EXEC_SANDBOX,
} from '../constants/sandboxed.constant';

export const InjectCounterExecSandboxedProcess = () => InjectQueue(COUNTER_EXEC_SANDBOX);
