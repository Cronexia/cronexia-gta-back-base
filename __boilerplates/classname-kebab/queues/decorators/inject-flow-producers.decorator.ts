import { InjectFlowProducer } from '@nestjs/bullmq';
import { COUNTER_EXEC_FLOW } from '../constants/flows.constant';

export const InjectCounterExecFlowProducer = () => InjectFlowProducer(COUNTER_EXEC_FLOW);
