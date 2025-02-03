// ! 💩 HS: Besoin de register les Queues par Injection ~> @InjectQueue(AUDIO) private audioQueue: Queue,
// ! 💩 HS: Besoin de register les Queues par Injection ~> @InjectQueue(AUDIO) private audioQueue: Queue,
// ! 💩 HS: Besoin de register les Queues par Injection ~> @InjectQueue(AUDIO) private audioQueue: Queue,

import { Resolver, Query, Args, registerEnumType } from '@nestjs/graphql';
import { Queue } from 'bullmq';
// import { InjectQueue } from '@nestjs/bullmq';

import { QueuesModule } from './queues.module';
import { JobStateEnum } from './enums/job-state.enum';

// import { AUDIO, TEXT } from '../__tests-and-examples/_queues-nestjs-tests/constants/queues.constant';

@Resolver()
export class QueuesResolver {
  constructor() {
    // @InjectQueue(AUDIO) private audioQueue: Queue,
    // ! 🔢 Dedicated ENUMs
    registerEnumType(JobStateEnum, {
      name: 'JobStateEnum',
      description: 'Queues Jobs available states.',
      valuesMap: {
        completed: {
          description: 'completed',
        },
        wait: {
          description: 'wait',
        },
        active: {
          description: 'active',
        },
        paused: {
          description: 'paused',
        },
        prioritized: {
          description: 'prioritized',
        },
        delayed: {
          description: 'delayed',
        },
        failed: {
          description: 'failed',
        },
      },
    });
  }

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'queuesDrain',
    description: `🛣️💦 Queues: Drain
    \n
    \n 💩 HS: Besoin de register les Queues par Injection ~> @InjectQueue(AUDIO) private audioQueue: Queue,
    \n
    \n Removes all jobs that are waiting or delayed, but not active, waiting-children, completed or failed.
    \n
    \n https://docs.bullmq.io/guide/queues/removing-jobs#drain
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { queuesDrain }
    `,
  })
  async queuesDrain(): Promise<string | null> {
    const allQueuesNames = QueuesModule.getAllQueuesNames();

    for (const queueName of allQueuesNames) {
      // ! 💩 Manque la ref
      const queue = new Queue(queueName);
      await queue.drain();
    }

    return `🛣️💦 All jobs ${allQueuesNames.join(', ')} drained.`;
  }

  // ---

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'queuesClean',
    description: `🛣️🧹 Queues: Clean
    \n
    \n 💩 HS: Besoin de register les Queues par Injection ~> @InjectQueue(AUDIO) private audioQueue: Queue,
    \n
    \n Removes jobs in a specific state, but keeps jobs within a certain grace period.
    \n
    \n https://docs.bullmq.io/guide/queues/removing-jobs#clean
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { queuesClean(state: "completed") }
    `,
  })
  async queuesClean(
    @Args({
      name: 'state',
      defaultValue: 'completed',
      description: `Specific state: "completed" | "wait" | "active" | "paused" | "prioritized" | "delayed" | "failed"`,
      nullable: false,
      // type: () => JobStateEnum,
      type: () => String,
    })
    state: JobStateEnum,
  ): Promise<string | null> {
    const allQueuesNames = QueuesModule.getAllQueuesNames();

    for (const queueName of allQueuesNames) {
      // ! 💩 Manque la ref
      const queue = new Queue(queueName);
      await queue.clean(
        60000, // 1 minute
        1000, // max number of jobs to clean
        state,
      );
    }

    return `🛣️🧹 All jobs ${allQueuesNames.join(', ')} with state '${state}' cleaned.`;
  }

  // ---

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'queuesObliterate',
    description: `🛣️☢️ Queues: Obliterate
    \n
    \n 💩 HS: Besoin de register les Queues par Injection ~> @InjectQueue(AUDIO) private audioQueue: Queue,
    \n
    \n Completely obliterates a queue and all of its contents.
    \n
    \n https://docs.bullmq.io/guide/queues/removing-jobs#obliterate
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { queuesObliterate }
    `,
  })
  async queuesObliterate(): Promise<string | null> {
    const allQueuesNames = QueuesModule.getAllQueuesNames();

    for (const queueName of allQueuesNames) {
      // ! 💩 Manque la ref
      const queue = new Queue(queueName);
      await queue.obliterate();
    }

    // 📌 Passage par ref. via injection de dep
    // await this.audioQueue.obliterate();

    return `🛣️☢️ All jobs ${allQueuesNames.join(', ')} obliterated.`;
  }
}
