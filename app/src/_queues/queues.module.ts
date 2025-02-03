// * Projet d'exemple
// 🛣️🌊👀 Visualiseur de jobs en plus
import { DynamicModule, Module } from '@nestjs/common';
import { QueuesResolver } from './queues.resolver';

import { BullModule } from '@nestjs/bullmq';

import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import {
  ConfigurableModuleClass,
  OPTIONS_TYPE,
} from './queues.module-definition';

// ! 🔧🔀 Set global concurrency
//            https://docs.bullmq.io/guide/queues/global-concurrency
//            https://docs.bullmq.io/guide/workers/concurrency
// const globalConcurrency = 4;
// Nest, pas de global ?
//            https://docs.nestjs.com/techniques/queues#consumers-1
// const concurrencyPerWorker = 4;
// * A définir dans chaque @Processor('QUEUE_NAME', { concurrency: 4 } )
//      Et non lors de registerQueue

// ---

// * Give acces to all registered queues and flows
// !    Works only if queues and flows are registered through QueuesModule
let allQueuesNames: Array<string> = [];
let allFlowsNames: Array<string> = [];
let allQueuesAndFlowsNames: Array<string> = [];

@Module({
  providers: [QueuesResolver],
})
export class QueuesModule extends ConfigurableModuleClass {
  // TODO: ⛱️ passer un objet plutôt qu'un nom afin de pouvoir gérer les sandboxed
  //    {
  //      name: COUNTER_EXEC_SANDBOX,
  //      processors: [join(__dirname, '/processors-sandboxed/my-worker.js')],
  //    },
  static register(options: typeof OPTIONS_TYPE): DynamicModule {
    // * 👀🛣️ Register Queue to BullBoard visualizer
    const bullBoardModules = options.queues.map((name) =>
      BullBoardModule.forFeature({
        name,
        adapter: BullMQAdapter,
      }),
    );

    // * 🛣️ Register BullMQ Queue in NodeJS, allowing Injection
    // BullMQ > Queue options
    //      https://api.docs.bullmq.io/interfaces/v4.QueueOptions.html
    const bullModules = options.queues.map((name) =>
      BullModule.registerQueue({ name }),
    );

    allQueuesNames.push(...options.queues.map((name) => name));

    // ---

    // ❌👀🌊 Flow aren't registered to BullBoard, only Queues/jobs

    // * 🌊 Register BullMQ Queue in NodeJS, allowing Injection
    const flowProducers = (options.flows || []).map((flow) =>
      // * BullMQ > Flow options
      //    https://docs.bullmq.io/guide/flows
      BullModule.registerFlowProducer({
        name: flow,
      }),
    );

    // ---

    allFlowsNames.push(...(options.flows || []).map((name) => name));

    allQueuesAndFlowsNames = [...allQueuesNames, ...allFlowsNames];

    return {
      ...super.register(options),
      imports: [...bullModules, ...bullBoardModules, ...flowProducers],
      exports: [...bullModules, ...flowProducers],
    };
  }

  static getAllQueuesNames() {
    return allQueuesNames;
  }

  static getAllFlowsNames() {
    return allFlowsNames;
  }

  static getAllQueuesAndFlowsNames() {
    return allQueuesAndFlowsNames;
  }
}
