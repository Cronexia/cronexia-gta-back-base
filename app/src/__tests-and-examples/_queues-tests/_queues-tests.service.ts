import { Injectable } from '@nestjs/common';
import { FlowChildJob, FlowProducer } from 'bullmq';

import { InjectFirstProducer } from './decorators/inject-flow-producer.decorator';
import { ArrayOperationDto } from './dtos/array-operation.dto';
import { MATH_ARRAY_OPS } from './enums/math-array-ops.enum';
import { MATH_ARRAY_CHILD, MATH_ARRAY_MERGE } from './constants/flows.constant';

const PARTITION_SIZE = 4;

@Injectable()
export class QueuesTestsService {
  constructor(@InjectFirstProducer() private firstProducer: FlowProducer) {}

  async createFlow(
    dto: ArrayOperationDto,
    jobName: MATH_ARRAY_OPS,
  ): Promise<string> {
    const children = this.createChildrenJobs(dto, jobName);

    // ! C'est peut être ici que se fait le calcul final ?
    const flow = await this.firstProducer.add({
      // ! On prend les résultats des children, et on applique le même job ?
      name: jobName,

      // * 📌 Test
      // name: MATH_ARRAY_OPS.MIN,
      // * Confirmé, si j'apelle gql { startOneFlow_ArrayMax } mais que je passe le nom de job ~Array.MIN
      // *    Les enfants sont séparés en 4 bulks, auquel est appliqué Array.MAX
      // *    Sur les résultats fournis pour chacun des bulks, est appliqué Array.MIN

      queueName: MATH_ARRAY_MERGE,
      children,
      opts: {
        failParentOnFailure: true,
      },
    });
    return flow.job.id || '';
  }

  async createMinMaxBulkFlow(dto: ArrayOperationDto): Promise<string[]> {
    const minChildren = this.createChildrenJobs(dto, MATH_ARRAY_OPS.MIN);
    const maxChildren = this.createChildrenJobs(dto, MATH_ARRAY_OPS.MAX);

    const flows = await this.firstProducer.addBulk([
      {
        name: MATH_ARRAY_OPS.MIN,
        queueName: MATH_ARRAY_MERGE,
        children: minChildren,
        opts: {
          failParentOnFailure: true,
        },
      },
      {
        name: MATH_ARRAY_OPS.MAX,
        queueName: MATH_ARRAY_MERGE,
        children: maxChildren,
        opts: {
          failParentOnFailure: true,
        },
      },
    ]);

    return flows.map((flow) => flow.job.id || '');
  }

  // Découpage en batch de PARTITION_SIZE
  // * Renvoie un tableau de Jobs enfants
  private createChildrenJobs(dto: ArrayOperationDto, jobName: MATH_ARRAY_OPS) {
    const numPartitions = Math.ceil(dto.data.length / PARTITION_SIZE);
    let startIndex = 0;

    const children: FlowChildJob[] = [];
    for (let i = 0; i < numPartitions - 1; i++) {
      children.push({
        name: jobName,
        data: {
          data: dto.data.slice(startIndex, startIndex + PARTITION_SIZE),
          // Chaque job se voit attribuer le pourcentage de complémtion (à son propre terme)
          percentage: (100 / numPartitions) * (i + 1),
        },
        queueName: MATH_ARRAY_CHILD,
      });
      startIndex += PARTITION_SIZE;
    }

    // Dernier ajout, si le nombre n'est pas divisible par PARTITION_SIZE sans reste
    // 🐛 Ajout du job en doublon si nb enfants < PARTITION_SIZE
    if (dto.data.length > PARTITION_SIZE) {
      children.push({
        name: jobName,
        data: { data: dto.data.slice(startIndex), percentage: 100 },
        queueName: MATH_ARRAY_CHILD,
      });
    }

    return children;
  }
}
