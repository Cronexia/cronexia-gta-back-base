import { FlowChildJob, FlowProducer } from 'bullmq';

import { COUNTER_EXEC_FLOW_CHILD } from '../constants/queues.constant';
import { COUNTER_EXEC_FLOW_PARTITION_SIZE } from '../constants/flows.constant';
import { COUNTER_EXEC_JOB_NAMES } from '../enums/counter-exec-jobs.enum';

// * ✂️ Découpage en batch de taille COUNTER_EXEC_FLOW_PARTITION_SIZE (4)
// * Renvoie un tableau de Jobs enfants
export function createChildrenJobs(
  // dto: ArrayOperationDto,
  dto: {
    data: Array<any>
  },
  jobName: COUNTER_EXEC_JOB_NAMES
) {
  const numPartitions = Math.ceil(dto.data.length / COUNTER_EXEC_FLOW_PARTITION_SIZE);
  let startIndex = 0;

  const children: FlowChildJob[] = [];
  for (let i = 0; i < numPartitions - 1; i++) {
    children.push({
      name: jobName,
      data: {
        data: dto.data.slice(startIndex, startIndex + COUNTER_EXEC_FLOW_PARTITION_SIZE),
        // Chaque job se voit attribuer le pourcentage de complémtion (à son propre terme)
        percentage: (100 / numPartitions) * (i + 1),
      },
      queueName: COUNTER_EXEC_FLOW_CHILD,
    });
    startIndex += COUNTER_EXEC_FLOW_PARTITION_SIZE;
  }

  // Dernier ajout, si le nombre n'est pas divisible par COUNTER_EXEC_FLOW_PARTITION_SIZE sans reste
  children.push({
    name: jobName,
    data: { data: dto.data.slice(startIndex), percentage: 100 },
    queueName: COUNTER_EXEC_FLOW_CHILD,
  });

  return children;
}
