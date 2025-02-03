// * https://blog.taskforce.sh/using-typescript-with-bullmq/
// import { Job } from 'bullmq';
import { SandboxedJob } from 'bullmq';
import { timeoutThenMessage } from '../../../_utility/time/timeout-then-message';

/**
 * Dummy worker
 *
 * This worker is responsible for doing something useful.
 *
 */
// export default async function (job: Job) {
export default async function (job: SandboxedJob) {
  await job.log('Start processing job');

  const message = await timeoutThenMessage(2000, 'fini !');

  console.log('Doing something useful...', job.id, job.data, message);
}
