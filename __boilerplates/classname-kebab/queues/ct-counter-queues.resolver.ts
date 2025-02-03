import { Resolver, Query, Args } from '@nestjs/graphql';
import { CounterQueuesService } from './ct-counter-queues.service';

// 🪨 Constants
import { COUNTER_EXEC_JOB_NAMES } from './enums/counter-exec-jobs.enum';

@Resolver()
export class CounterQueuesResolver {
  constructor(
    private readonly counterQueuesService: CounterQueuesService,
  ) {}
  // TODO: 💦🧹☢️ Ajout des Queues.drains/clean/nuke spécifiques car injection locale
  // cf. `cronexia-gta/app/src/ct-counters/queues/ct-counter-queues.resolver.ts`
  
  // ---

  // * 🛣️ Jobs
  @Query(() => String, {
    name: 'q_counterExec_createJob',
    description: `🛣️ Create one job
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { q_counterExec_createJob }
    `,
  })
  async q_counterExec_createJob(
    // ⚙️ Gather params
    // @Args() jobParamsArgs: JobParamsArgs,
  ): Promise<string | null> {
    const jobName = COUNTER_EXEC_JOB_NAMES._TEST;

    // 🛣️ Create job
    const jobIdOrNull = this.counterQueuesService.createJob(jobName);

    if (jobIdOrNull !== null) {
      return `✅🛣️ counterQueuesService.createJob(${jobName}) check progress on terminal.\nJob id : ${jobIdOrNull}`;
    } else {
      return `🐛🛣️ counterQueuesService.createJob(${jobName}) > Problem creating job`;
    }
  }

  // * 🌊 Flows
  @Query(() => String, {
    name: 'q_counterExec_createFlow',
    description: `🌊 Create one flow
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { q_counterExec_createFlow }
    `,
  })
  async q_counterExec_createFlow(
    // ⚙️ Gather params
    // @Args() jobParamsArgs: JobParamsArgs,
  ): Promise<string | null> {
    const jobName = COUNTER_EXEC_JOB_NAMES._TEST;

    // 🛣️ Create job
    const jobIdOrNull = this.counterQueuesService.createFlow(jobName);

    if (jobIdOrNull !== null) {
      return `✅🌊 counterQueuesService.createFlow(${jobName}) check progress on terminal.\nJob id : ${jobIdOrNull}`;
    } else {
      return `🐛🌊 counterQueuesService.createFlow(${jobName}) > Problem creating job`;
    }
  }

  // * ⛱️ Sandboxed process
  @Query(() => String, {
    name: 'q_counterExec_createSandboxedProcess',
    description: `⛱️ Create one sandboxed process
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { q_counterExec_createSandboxedProcess }
    `,
  })
  async q_counterExec_createSandboxedProcess(
    // ⚙️ Gather params
    // @Args() jobParamsArgs: JobParamsArgs,
  ): Promise<string | null> {
    const jobName = COUNTER_EXEC_JOB_NAMES._TEST;

    // 🛣️ Create job
    const jobIdOrNull = this.counterQueuesService.createSandBoxedProcess(jobName);

    if (jobIdOrNull !== null) {
      return `✅🌊 counterQueuesService.createSandboxedProcess(${jobName}) check progress on terminal.\nJob id : ${jobIdOrNull}`;
    } else {
      return `🐛🌊 counterQueuesService.createSandboxedProcess(${jobName}) > Problem creating job`;
    }
  }
}
