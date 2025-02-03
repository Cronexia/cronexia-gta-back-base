import { InjectFlowProducer } from '@nestjs/bullmq';
import { MATH_ARRAY_PRODUCER } from '../constants/flows.constant';

export const InjectFirstProducer = () =>
  InjectFlowProducer(MATH_ARRAY_PRODUCER);
