// * ⛱️ Sandboxed process
//          https://blog.taskforce.sh/using-typescript-with-bullmq/
import { Job } from 'bullmq';
import { timeoutThenMessage } from '../../../_utility/time/timeout-then-message';

// * Dummy worker
// This worker is responsible for doing something useful.
export default async function (job: Job) {
  await job.log('Dummy worker > Start processing job');

  const message = await timeoutThenMessage(2000, 'fini !');

  console.log('Dummy worker > Doing something useful...', job.id, job.data, message);
}
