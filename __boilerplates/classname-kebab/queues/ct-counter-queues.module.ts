import { Module, forwardRef } from '@nestjs/common';
import { CounterQueuesService } from './ct-counter-queues.service';
import { CounterQueuesResolver } from './ct-counter-queues.resolver';

import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

// 🧰 Queue module
import { QueuesModule } from '../../_queues/queues.module';

// ⬇️ Module du parent
import { CtCountersModule } from '../ct-counters.module';

// 🪨 Constants
import { COUNTER_EXEC, COUNTER_EXEC_FLOW_CHILD, COUNTER_EXEC_FLOW_GROUP_IN_THE_END } from './constants/queues.constant';
import { COUNTER_EXEC_FLOW } from './constants/flows.constant';

//  ⚙️ Processors
import { CounterExecProcessor } from './processors/counter-exec.processor';
import { CounterExecFlowProcessor } from './processors/counter-exec-flow.processor';
import { CounterExecFlowChildProcessor } from './processors/counter-exec-flow-child.processor';

// Sandboxed
import { BullModule } from '@nestjs/bullmq';
import { join } from 'path';
import { COUNTER_EXEC_SANDBOX } from './constants/sandboxed.constant';

@Module({
  // ⬆️
  exports: [CounterQueuesService],

  // ⬇️
  imports: [
    // Module du parent
    forwardRef(() => CtCountersModule),

    QueuesModule.register({
      // * 🛣️ Queues
      queues: [COUNTER_EXEC, COUNTER_EXEC_FLOW_CHILD, COUNTER_EXEC_FLOW_GROUP_IN_THE_END],

      // * 🌊 Flows
      flows: [COUNTER_EXEC_FLOW],
    }),

    // * ⛱️ Sandboxed
    //    https://blog.taskforce.sh/using-typescript-with-bullmq/
    BullModule.registerQueue(
      {
        name: COUNTER_EXEC_SANDBOX,
        // !                                                          🚨 compiled > .js et pas .ts !
        processors: [join(__dirname, '/processors-sandboxed/my-worker.js')],
      },
    ),
    // * ⛱️👀 Add sandboxed process to bull board (custom Queues module needs an update)
    BullBoardModule.forFeature({
      name: COUNTER_EXEC_SANDBOX,
      adapter: BullMQAdapter,
    }),
  ],

  // 📦️
  providers: [
    CounterQueuesResolver,
    CounterQueuesService,

    // * 🚨⚙️ Processors
    CounterExecProcessor,
    CounterExecFlowProcessor,
    CounterExecFlowChildProcessor,
  ],
})
export class CounterQueuesModule {}
