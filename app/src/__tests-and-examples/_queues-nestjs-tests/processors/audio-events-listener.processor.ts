import {
  QueueEventsHost,
  QueueEventsListener,
  OnQueueEvent,
} from '@nestjs/bullmq';

@QueueEventsListener('audio')
export class AudioEventsListener extends QueueEventsHost {
  // https://api.docs.bullmq.io/interfaces/v4.QueueEventsListener.html
  @OnQueueEvent('active')
  onActive(job: { jobId: string; prev?: string }) {
    console.log(`@OnQueueEvent('active') > Processing job ${job.jobId}...`);
  }

  @OnQueueEvent('added')
  onAdded(args, id) {
    console.log(`@OnQueueEvent('added') > args: ${args}, id: ${id}`);
  }

  @OnQueueEvent('cleaned')
  onCleaned(args, id) {
    console.log(`@OnQueueEvent('cleaned') > args: ${args}, id: ${id}`);
  }

  @OnQueueEvent('completed')
  onCompleted(args, id) {
    console.log(`@OnQueueEvent('completed') > args: ${args}, id: ${id}`);
  }

  @OnQueueEvent('delayed')
  onDelayed(args, id) {
    console.log(`@OnQueueEvent('delayed') > args: ${args}, id: ${id}`);
  }

  @OnQueueEvent('drained')
  onDrained(id) {
    console.log(`@OnQueueEvent('drained') > id: ${id}`);
  }

  @OnQueueEvent('duplicated')
  onDuplicated(args, id) {
    console.log(`@OnQueueEvent('duplicated') > args: ${args}, id: ${id}`);
  }

  @OnQueueEvent('error')
  onError(args) {
    console.log(`@OnQueueEvent('error') > args: ${args}`);
  }

  @OnQueueEvent('failed')
  onFailed(args, id) {
    console.log(`@OnQueueEvent('failed') > args: ${args}, id: ${id}`);
  }

  // @OnQueueEvent('ioredis:close')

  @OnQueueEvent('progress')
  onProgress(args, id) {
    console.log(`@OnQueueEvent('progress') > args: ${args}, id: ${id}`);
  }

  @OnQueueEvent('removed')
  onRemoved(args, id) {
    console.log(`@OnQueueEvent('removed') > args: ${args}, id: ${id}`);
  }

  // @OnQueueEvent('resumed')

  @OnQueueEvent('retries-exhausted')
  onRetriesExhausted(args, id) {
    console.log(
      `@OnQueueEvent('retries-exhausted') > args: ${args}, id: ${id}`,
    );
  }

  @OnQueueEvent('stalled')
  onStalled(args, id) {
    console.log(`@OnQueueEvent('stalled') > args: ${args}, id: ${id}`);
  }

  @OnQueueEvent('waiting')
  onWaiting(args, id) {
    console.log(`@OnQueueEvent('waiting') > args: ${args}, id: ${id}`);
  }

  @OnQueueEvent('waiting-children')
  onWaitingChildren(args, id) {
    console.log(`@OnQueueEvent('waiting-children') > args: ${args}, id: ${id}`);
  }
}
