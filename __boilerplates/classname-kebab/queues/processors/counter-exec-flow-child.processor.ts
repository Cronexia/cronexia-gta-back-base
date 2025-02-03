import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { CustomLogsProcessor } from '../../../_queues/logs/custom-logs.processor';

import { timeoutThenMessage } from '../../../_utility/time/timeout-then-message';

import { COUNTER_EXEC_FLOW_CHILD } from '../constants/queues.constant';
import { COUNTER_EXEC_JOB_NAMES } from '../enums/counter-exec-jobs.enum';

import { CounterExecJobProgress } from '../interfaces/counter-exec-job-progress.interface';

// ! 🛒 Consumer = Processor
@Processor(COUNTER_EXEC_FLOW_CHILD, {
  concurrency: 4,
})
@Injectable()
// export class CounterExecFlowChildProcessor extends WorkerHost {
export class CounterExecFlowChildProcessor extends CustomLogsProcessor {
  // ! process est un nom de fonction spécifique
  // The process method is called whenever the worker is idle
  // and there are jobs to process in the queue.
  // This handler method receives the job object as its only argument.
  // The value returned by the handler method is stored in the job object
  // and can be accessed later on, for example in a listener for the completed event.
  //      BullMQ > Job > https://api.docs.bullmq.io/classes/v4.Job.html

  // Job<Datatype (en entrée), ReturnType (en sortir), Nametype = string
  // *     CounterExecJobProgress permet de passer le % de complétion total de chacun des enfants
  //            Définit dans ../functions/create-children-jobs.ts
  //            ex: si 10 bulks, bulk 1 = 10%, bulk 2 = 20%, etc.
  async process(job: Job<CounterExecJobProgress, string, string>): Promise<string> {
    // console.log('job');
    // console.log(job);
    // console.log();

    // * Gestion des différents types de job (sur la même queue) via un switch
    switch (job.name) {
      case COUNTER_EXEC_JOB_NAMES._TEST: {
        console.log('CounterExecFlowChildProcessoraaa');
        const result = await timeoutThenMessage(1000, JSON.stringify(job.data));
        console.log('CounterExecFlowChildProcessorbbb');

        //                       Propre à chaque enfant, mais ~= accumulation jusqu'à 100
        await job.updateProgress(job.data.percentage);

        console.log('CounterExecFlowChildProcessorccc');

        // * Complete the job via Promise.resolve
        // return Promise.resolve(`CounterExecFlowChildProcessor > Job completed yay !, results: ${result}`);
        return `CounterExecFlowChildProcessor > Job completed yay !, results: ${result}`;
      }
    }

    throw new BadRequestException(`CounterExecFlowChildProcessor > Unknown job name ${job.name}`);
  }
}
