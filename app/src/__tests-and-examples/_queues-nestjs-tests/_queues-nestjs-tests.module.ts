import { Module } from '@nestjs/common';
import { QueuesNestjsTestsService } from './_queues-nestjs-tests.service';
import { QueuesNestjsTestsResolver } from './_queues-nestjs-tests.resolver';

import { QueuesModule } from '../../_queues/queues.module';
import { AUDIO, TEXT } from './constants/queues.constant';
import { FLOW_PRODUCER_NAME } from './constants/flows.constant';

import { AudioConsumer } from './processors/audio.processor';
import { AudioEventsListener } from './processors/audio-events-listener.processor';

// Sandboxed
import { BullModule } from '@nestjs/bullmq';
import { join } from 'path';
import { TextConsumer } from './processors/text.processor';

@Module({
  imports: [
    QueuesModule.register({
      // On passe des strings, qui servent de référence
      queues: [AUDIO, TEXT],
      flows: [FLOW_PRODUCER_NAME],
    }),

    // * ⛱️ Sandboxed
    //    https://blog.taskforce.sh/using-typescript-with-bullmq/
    BullModule.registerQueue(
      {
        name: 'audioSandboxed',
        // !                                            🚨 compiled > .js et pas .ts !
        processors: [join(__dirname, '/sandboxed-workers/my-worker.js')],
      },
      {
        name: 'audioOtherSandboxed',
        // !                                            🚨 compiled > .js et pas .ts !
        processors: [join(__dirname, '/sandboxed-workers/my-other-worker.js')],
      },
    ),
  ],
  providers: [
    QueuesNestjsTestsResolver,
    QueuesNestjsTestsService,
    AudioConsumer,
    AudioEventsListener,
    TextConsumer,
  ],
})
export class QueuesNestjsTestsModule {}
