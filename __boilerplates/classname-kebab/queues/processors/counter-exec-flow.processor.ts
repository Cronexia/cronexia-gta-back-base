import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { CustomLogsProcessor } from '../../../_queues/logs/custom-logs.processor';

import { timeoutThenMessage } from '../../../_utility/time/timeout-then-message';

import { COUNTER_EXEC_FLOW } from '../constants/flows.constant';
import { COUNTER_EXEC_JOB_NAMES } from '../enums/counter-exec-jobs.enum';

// ! 🛒 Consumer = Processor
@Processor(COUNTER_EXEC_FLOW, {
  concurrency: 4,
})
@Injectable()
// export class CounterExecFlowProcessor extends WorkerHost {
export class CounterExecFlowProcessor extends CustomLogsProcessor {
  // ! process est un nom de fonction spécifique
  // The process method is called whenever the worker is idle
  // and there are jobs to process in the queue.
  // This handler method receives the job object as its only argument.
  // The value returned by the handler method is stored in the job object
  // and can be accessed later on, for example in a listener for the completed event.
  //      BullMQ > Job > https://api.docs.bullmq.io/classes/v4.Job.html
  async process(job: Job<any, any, string>): Promise<string> {
    // console.log('job');
    // console.log(job);
    // console.log();

    // * Gestion des différents types de job (sur la même queue) via un switch
    switch (job.name) {
      case COUNTER_EXEC_JOB_NAMES._TEST: {
        console.log('CounterExecFlowProcessoraaa');
        const result = await timeoutThenMessage(1000, JSON.stringify(job.data));
        console.log('CounterExecFlowProcessorbbb');
        // * Job functions
        // https://api.docs.bullmq.io/classes/v4.Job.html

        // Une seule passe > 100%
        await job.updateProgress(100);

        console.log('CounterExecFlowProcessorccc');

        // * Complete the job via Promise.resolve
        // return Promise.resolve(`CounterExecFlowProcessor > Job completed yay !, results: ${result}`);
        return `CounterExecFlowProcessor > Job completed yay !, results: ${result}`;
      }
    }

    throw new BadRequestException(`CounterExecFlowProcessor > Unknown job name ${job.name}`);
  }
}
