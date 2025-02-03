import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { CustomLogsProcessor } from '../../../_queues/logs/custom-logs.processor';

import { timeoutThenMessage } from '../../../_utility/time/timeout-then-message';

import { COUNTER_EXEC } from '../constants/queues.constant';
import { COUNTER_EXEC_JOB_NAMES } from '../enums/counter-exec-jobs.enum';

// ! 🛒 Consumer = Processor
@Processor(COUNTER_EXEC, {
  concurrency: 4,
})
@Injectable()
// export class CounterExecProcessor extends WorkerHost {
export class CounterExecProcessor extends CustomLogsProcessor {
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
        const results: Array<string> = [];
        //                                                 4 loops : 4 x 25
        for (let progress = 0; progress <= 100; progress += 25) {
          results.push(await timeoutThenMessage(1000, JSON.stringify(job.data)));
          // * Job functions
          // https://api.docs.bullmq.io/classes/v4.Job.html
          await job.updateProgress(progress);
        }
        // * Complete the job via Promise.resolve
        return Promise.resolve(`CounterExecProcessor > Job completed yay !, results: ${results.join(', ')}`);
      }
    }

    throw new BadRequestException(`CounterExecProcessor > Unknown job name ${job.name}`);
  }
}
