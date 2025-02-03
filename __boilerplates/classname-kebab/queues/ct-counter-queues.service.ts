import { Injectable } from '@nestjs/common';
import { FlowProducer, Queue } from 'bullmq';

// ⬇️ Service du parent
import { CtCountersService } from '../ct-counters.service';

// 🪨 Constants
import { COUNTER_EXEC_FLOW } from './constants/flows.constant';
import { COUNTER_EXEC_JOB_NAMES } from './enums/counter-exec-jobs.enum';

// 💉 Queues & Flows injections
import { InjectCounterExecQueue } from './decorators/inject-queues.decorator';
import { InjectCounterExecFlowProducer } from './decorators/inject-flow-producers.decorator';
import { InjectCounterExecSandboxedProcess } from './decorators/inject-sandboxed-process.decorator';

// 🦾 Functions
import { createChildrenJobs } from './functions/create-children-jobs';

// ---

@Injectable()
export class CounterQueuesService {
  constructor(
    // ⬇️ Service du parent
    private readonly countersService: CtCountersService,

    // Injection des décorateurs dans le constructeur
    @InjectCounterExecQueue() private counterExecQueue: Queue,
    @InjectCounterExecFlowProducer()
    private counterExecFlowProducer: FlowProducer,
    @InjectCounterExecSandboxedProcess()
    private counterExecSandboxedProcess: Queue,
  ) {}
  // TODO: 💦🧹☢️ Ajout des Queues.drains/clean/nuke spécifiques car injection locale

  // ---

  // ! 🏪🛣️ Producers > Adding a job to a queue
  async createJob(jobName: COUNTER_EXEC_JOB_NAMES): Promise<string | null> {
    // ⚡️ Gain de performances possible sans await, mais moins de visibilité
    // const job = this.counterExecQueue.add(
    const job = await this.counterExecQueue.add(
      jobName,
      {
        foo: 'bar',
      },
      { delay: 1000 }, // 1 seconds delayed
    );

    if (job.hasOwnProperty('id')) {
      return job.id;
    } else {
      return null;
    }
  }

  // ! 🏪🌊 Producers > Adding a flow to a queue
  async createFlow(
    jobName: COUNTER_EXEC_JOB_NAMES,
    // dto: ArrayOperationDto,
  ): Promise<string> {
    const dto = {
      data: [1, 2, 5, -3, 90, 77, -900, 700, 300, 999, -1000, 1099, -2000],
    };

    // ✂️ Découpage
    const children = createChildrenJobs(dto, jobName);

    // * Traitement des Jobs enfants en premier,
    // * PUIS dernier Job à partir des résultats des enfants
    // *    Les Jobs enfants sont attribués dans createChildrenJobs
    // *    Le Job final attribué ici peut être différent, par exemple concaténation ou agglomération des résultats
    // ⚡️ Gain de performances possible sans await, mais moins de visibilité
    const flow = await this.counterExecFlowProducer.add({
      // Job à appliquer sur les résultats cumulés des enfants
      name: jobName,

      // Affectation à un worker dédié
      // Affectation à un worker dédié
      // ! 🚨 Différent du flow producer qui est uniquement injecté
      // ! 🚨 Il s'agit bien d'une Queue
      queueName: COUNTER_EXEC_FLOW_GROUP_IN_THE_END,

      // Traitement des bulks, en premier
      children,

      // Options
      opts: {
        failParentOnFailure: true,
      },
    });

    if (flow.job.hasOwnProperty('id')) {
      return `✅🌊 createFlow(${jobName}) check progress on terminal.\nFlow.job id : ${flow.job.id}`;
    } else {
      return `🐛🌊 createFlow(${jobName}) > Problem creating Flow.job`;
    }
  }

  // ! 🏪 Producers > ⛱️ Adding a job to a sandboxed process
  async createSandBoxedProcess(
    jobName: COUNTER_EXEC_JOB_NAMES,
  ): Promise<string> {
    // ⚡️ Gain de performances possible sans await, mais moins de visibilité
    // const job = this.counterExecQueue.add(
    const job = await this.counterExecSandboxedProcess.add(
      jobName,
      {
        foo: 'bar',
      },
      { delay: 1000 }, // 1 seconds delayed
    );

    if (job.hasOwnProperty('id')) {
      return job.id;
    } else {
      return null;
    }
  }
}
