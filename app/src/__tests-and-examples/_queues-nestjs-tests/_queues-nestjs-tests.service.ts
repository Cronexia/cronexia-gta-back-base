import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { AUDIO, TEXT } from './constants/queues.constant';

@Injectable()
export class QueuesNestjsTestsService {
  constructor(
    @InjectQueue(AUDIO) private audioQueue: Queue,
    @InjectQueue(TEXT) private textQueue: Queue,

    //            def. in module
    @InjectQueue('audioSandboxed') private audioSandboxedQueue: Queue,
    @InjectQueue('audioOtherSandboxed') private audioOtherSandboxedQueue: Queue,
  ) {}

  // ! 🏪 Producers > Adding a job
  async addOneJob(): Promise<string> {
    const job = await this.audioQueue.add(
      'transcode',
      {
        foo: 'bar',
      },
      { delay: 1000 }, // 1 seconds delayed
    );

    if (job.hasOwnProperty('id')) {
      return `✅🛣️ addOneJob > One job started, check progress on terminal.\nJob id : ${job.id}`;
    } else {
      return `🐛🛣️ addOneJob > Problem creating job`;
    }
  }

  // ! 🏪 Producers > Adding multiple jobs in parrallel
  async addMultipleJobsInParrallel(): Promise<string> {
    // * ☰ Add jobs in parrallel, 🚨 Do not await
    console.log('Adding jobs...');
    for (let i = 0; i < 10; i++) {
      // ! 🚨 No await, for parrallelism
      this.audioQueue.add(
        'transcode',
        {
          foo: 'bar',
        },
        { delay: 1000 }, // 1 seconds delayed
      );
    }
    console.log('Jobs added');

    return `✅🛣️☰ addMultipleJobsInParrallel > All jobs started, check progress on terminal`;
  }

  // ! 🏪 Producers > ⛱️ Sandboxed
  async addMultipleJobsToSandboxedWorker(): Promise<string> {
    // * ☰ Add jobs in parrallel, 🚨 Do not await
    console.log('Adding jobs...');
    for (let i = 0; i < 10; i++) {
      // ! 🚨 No await, for parrallelism
      this.audioSandboxedQueue.add(
        'my-job',
        {
          foo: 'bar',
        },
        { delay: 1000 }, // 1 seconds delayed
      );
    }
    console.log('Jobs added');

    return `✅🛣️☰ addMultipleJobsInParrallel > All jobs started, check progress on terminal`;
  }

  // ! 🏪 Producers > ⛱️ Multiple Sandboxed
  async addMultipleJobsToMultipleSandboxedWorker(): Promise<string> {
    // * ☰ Add jobs in parrallel, 🚨 Do not await
    console.log('Adding jobs to worker 1...');
    for (let i = 0; i < 10; i++) {
      // ! 🚨 No await, for parrallelism
      this.audioSandboxedQueue.add('my-job', {
        foo: 'bar',
      });
    }
    console.log('Jobs added to worker 1');

    console.log('Adding jobs to other worker 2...');
    for (let i = 0; i < 10; i++) {
      // ! 🚨 No await, for parrallelism
      this.audioOtherSandboxedQueue.add('my-job', {
        foo: 'bar',
      });
    }
    console.log('Jobs added to other worker 2');

    return `✅🛣️☰ addMultipleJobsToMultipleSandboxedWorker > All jobs started, check progress on terminal`;
  }

  // ---

  // ! 🏪 Producers > Adding multiple jobs in parrallel on different workers not sandboxed
  async addMultipleJobsInParrallelDifferentWorkersNoSandbox(): Promise<string> {
    // * ☰ Add jobs in parrallel, 🚨 Do not await
    console.log('Adding jobs to worker 1 audio...');
    for (let i = 0; i < 5; i++) {
      // ! 🚨 No await, for parrallelism
      this.audioQueue.add('transcode', {
        foo: 'bar',
      });
    }
    console.log('Jobs added to worker 1 audio');

    console.log('Adding jobs to other worker 2 text...');
    for (let i = 0; i < 5; i++) {
      // ! 🚨 No await, for parrallelism
      this.textQueue.add('text-process', {
        foo: 'bar',
      });
    }
    console.log('Jobs added to other worker 2 text');

    return `✅🛣️☰ addMultipleJobsToMultipleSandboxedWorker > All jobs started, check progress on terminal`;
  }
}
