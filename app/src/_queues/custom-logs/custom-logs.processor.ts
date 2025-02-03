import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export abstract class CustomLogsProcessor extends WorkerHost {
  protected readonly logger = new Logger(CustomLogsProcessor.name);

  // ! Events
  // https://api.docs.bullmq.io/interfaces/v4.WorkerListener.html
  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.time(`Job '${job.id}' / ⏱️ Job time`);
    console.log(`@OnWorkerEvent('active') > Processing job ${job.name}...`);
    // console.log(`job id: ${job.id}`);
    // console.log(`with data ${JSON.stringify(job.data)}`);
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
    console.log(`@OnWorkerEvent('completed') > ${job.name}`);
    // console.log('job.name');
    // console.log(job.name);
    // console.log('result');
    // console.log(result);
    // console.log('prev');
    // console.log(prev);
    // console.log();
    console.timeEnd(`Job '${job.id}' / ⏱️ Job time`);
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
