import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { AUDIO } from '../constants/queues.constant';
import { timeoutThenMessage } from '../../../_utility/time/timeout-then-message';

// ! 🛒 Consumer = Processor
@Processor(AUDIO, {
  concurrency: 4,
})
@Injectable()
export class AudioConsumer extends WorkerHost {
  // ! process est un nom de fonction spécifique
  // The process method is called whenever the worker is idle
  // and there are jobs to process in the queue.
  // This handler method receives the job object as its only argument.
  // The value returned by the handler method is stored in the job object
  // and can be accessed later on, for example in a listener for the completed event.
  //      BullMQ > Job > https://api.docs.bullmq.io/classes/v4.Job.html
  async process(job: Job<any, any, string>): Promise<any> {
    // console.log('job');
    // console.log(job);
    // console.log();

    // * Gestion des différents types de job (sur la même queue) via un switch
    switch (job.name) {
      case 'transcode': {
        //                                                 4 loops : 4 x 25
        for (let progress = 0; progress <= 100; progress += 25) {
          // await doSomething(job.data);
          await timeoutThenMessage(2000, JSON.stringify(job.data));
          // ! Job functions
          // https://api.docs.bullmq.io/classes/v4.Job.html

          // * 🐛 Erreur dans la doc NestJs
          //          progress est une properties, et non une fonction
          // await job.progress(progress);
          await job.updateProgress(progress);
        }
        // ! Complete the job via Promise.resolve
        //      Sends back result, if any
        // return {};
        return Promise.resolve('Job completed yay !');
      }
      case 'concatenate': {
        await doSomeLogic2();
        break;
      }
    }
  }

  // ! Events
  // https://api.docs.bullmq.io/interfaces/v4.WorkerListener.html
  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `@OnWorkerEvent('active') > Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`,
    );
  }

  @OnWorkerEvent('closed')
  onClosed() {
    console.log(`@OnWorkerEvent('closed').`);
  }

  @OnWorkerEvent('closing')
  onClosing(msg) {
    console.log(`@OnWorkerEvent('closing') > ${msg}...`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job, result, prev) {
    console.log(`@OnWorkerEvent('completed')`);
    console.log('job.name');
    console.log(job.name);
    console.log('result');
    console.log(result);
    console.log('prev');
    console.log(prev);
    console.log();
  }

  @OnWorkerEvent('drained')
  onDrained() {
    console.log(`@OnWorkerEvent('drained').`);
  }

  @OnWorkerEvent('error')
  onError(failedReason) {
    console.log(`@OnWorkerEvent('error') : ${failedReason};`);
  }

  @OnWorkerEvent('failed')
  onFailed(job, error, prev) {
    console.log(`@OnWorkerEvent('failed')`);
    console.log('job.name');
    console.log(job.name);
    console.log('error');
    console.log(error);
    console.log('prev');
    console.log(prev);
    console.log();
  }

  // @OnWorkerEvent('ioredis:close')
  // @OnWorkerEvent('paused')

  @OnWorkerEvent('progress')
  onProgress(job, progress) {
    console.log(
      `@OnWorkerEvent('progress') : ${job.name}, progress: ${progress}`,
    );
  }

  // stfu
  // @OnWorkerEvent('ready')
  // onReady() {
  //   console.log(`@OnWorkerEvent('ready') !`);
  // }

  // @OnWorkerEvent('resumed')

  @OnWorkerEvent('stalled')
  onStalled(jobId, prev) {
    console.log(`@OnWorkerEvent('stalled')`);
    console.log('jobId');
    console.log(jobId);
    console.log('prev');
    console.log(prev);
    console.log();
  }
}

// ---

async function doSomeLogic2() {
  return 'bof';
}
