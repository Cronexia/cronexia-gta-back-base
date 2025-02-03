import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { TEXT } from '../constants/queues.constant';
import { timeoutThenMessage } from '../../../_utility/time/timeout-then-message';

// ! 🛒 Consumer = Processor
@Processor(TEXT)
@Injectable()
export class TextConsumer extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    // * Gestion des différents types de job (sur la même queue) via un switch
    switch (job.name) {
      case 'text-process': {
        //                                                 4 loops : 4 x 25
        for (let progress = 0; progress <= 100; progress += 25) {
          await timeoutThenMessage(1000, JSON.stringify(job.data));
          await job.updateProgress(progress);
        }
        return Promise.resolve('Text Job completed yay !');
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
