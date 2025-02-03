import { Resolver, Query, Args } from '@nestjs/graphql';
import { QueuesTestsService } from './_queues-tests.service';

import { Queue } from 'bullmq';
import { InjectFirstQueue } from './decorators/inject-queue.decorator';
import { JobParamsArgs } from './dtos/job-params.args';
import { JOB_NAMES } from './enums/job-names.enum';
import { ArrayOperationDto } from './dtos/array-operation.dto';
import { MATH_ARRAY_OPS } from './enums/math-array-ops.enum';

@Resolver()
export class QueuesTestsResolver {
  constructor(
    private readonly queuesTestsService: QueuesTestsService,

    // Injection du décorateur dans le constructeur
    @InjectFirstQueue() private firstQueue: Queue,
  ) {}

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'startOneJob',
    description: `📌🛣️ Test queues: Start one job (addition)
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { startOneJob(num: 2, num2: 3) }
    `,
  })
  async startOneJob(
    // ⚙️ Gather params
    @Args() jobParamsArgs: JobParamsArgs,
  ): Promise<string | null> {
    // 🛣️ Create job
    const job = await this.firstQueue.add(JOB_NAMES.SUM, jobParamsArgs);

    if (job.hasOwnProperty('id')) {
      return `✅🛣️ startOneJob > One job started, check progress on terminal.\nJob id : ${job.id}`;
    } else {
      return `🐛🛣️ startOneJob > Problem creating job`;
    }
  }

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'startMultipleJobs',
    description: `📌🛣️ Test queues: Start 10 jobs, auto filled, processing additions
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { startMultipleJobs }
    `,
  })
  async startMultipleJobs(): Promise<string | null> {
    const multipleParams = [
      { num: 1, num2: 21 },
      { num: 4, num2: 26 },
      { num: 6, num2: 27 },
      { num: 8, num2: 24 },
      { num: 2, num2: 22 },
      { num: 9, num2: 26 },
      { num: 3, num2: 27 },
      { num: 1, num2: 28 },
      { num: 7, num2: 29 },
      { num: 9, num2: 29 },
    ];
    // 🛣️ Create job
    let jobsIds = [];
    let errors = 0;
    for (const params of multipleParams) {
      const job = await this.firstQueue.add(JOB_NAMES.SUM, params);

      if (job.hasOwnProperty('id')) {
        jobsIds.push(job.id);
      } else {
        errors++;
      }
    }

    return `✅🛣️ ${jobsIds.length} jobs started, check progress on terminal. 🐛 Errors: ${errors}`;
  }

  // ---

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'startOneFlow_ArrayMin',
    description: `📌🌊 Test queues: Start one flow (valeur la plus basse dans un tableau)
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { startOneFlow_ArrayMin(data: [1,2,5,-3, 90, 77, -900, 700, 300, 999, -1000, 1099, -2000]) }
    `,
  })
  async startOneFlow_ArrayMin(
    // ⚙️ Gather params
    @Args() arrayOperationDto: ArrayOperationDto,
  ): Promise<string | null> {
    return this.queuesTestsService.createFlow(
      arrayOperationDto,
      MATH_ARRAY_OPS.MIN,
    );
  }

  // ---

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'startOneFlow_ArrayMax',
    description: `📌🌊 Test queues: Start one flow (valeur la plus basse dans un tableau)
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { startOneFlow_ArrayMax(data: [1,2,5,-3, 90, 77, -900, 700, 300, 999, -1000, 1099, -2000]) }
    `,
  })
  async startOneFlow_ArrayMax(
    // ⚙️ Gather params
    @Args() arrayOperationDto: ArrayOperationDto,
  ): Promise<string | null> {
    return this.queuesTestsService.createFlow(
      arrayOperationDto,
      MATH_ARRAY_OPS.MAX,
    );
  }

  // ---

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'startOneFlow_Array_FILTER_ODD',
    description: `📌🌊 Test queues: Start one flow (valeur la plus basse dans un tableau)
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { startOneFlow_Array_FILTER_ODD(data: [1,2,5,-3, 90, 77, -900, 700, 300, 999, -1000, 1099, -2000]) }
    `,
  })
  async startOneFlow_Array_FILTER_ODD(
    // ⚙️ Gather params
    @Args() arrayOperationDto: ArrayOperationDto,
  ): Promise<string | null> {
    return this.queuesTestsService.createFlow(
      arrayOperationDto,
      MATH_ARRAY_OPS.FILTER_ODD,
    );
  }

  // ---

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'startOneFlow_Array_FILTER_EVEN',
    description: `📌🌊 Test queues: Start one flow (valeur la plus basse dans un tableau)
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { startOneFlow_Array_FILTER_EVEN(data: [1,2,5,-3, 90, 77, -900, 700, 300, 999, -1000, 1099, -2000]) }
    `,
  })
  async startOneFlow_Array_FILTER_EVEN(
    // ⚙️ Gather params
    @Args() arrayOperationDto: ArrayOperationDto,
  ): Promise<string | null> {
    return this.queuesTestsService.createFlow(
      arrayOperationDto,
      MATH_ARRAY_OPS.FILTER_EVEN,
    );
  }

  // ---

  // 🗺️ Création de la route
  @Query(() => [String], {
    name: 'startTwoFlows_Array_MIN_et_MAX',
    description: `📌🌊🌊 Test queues: Start 2 flows (valeur la plus basse dans un tableau, et la plus haute)
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { startTwoFlows_Array_MIN_et_MAX(data: [1,2,5,-3, 90, 77, -900, 700, 300, 999, -1000, 1099, -2000]) }
    `,
  })
  async startTwoFlows_Array_MIN_et_MAX(
    // ⚙️ Gather params
    @Args() arrayOperationDto: ArrayOperationDto,
    //      🚨 Array en retour, le service renvoie return flows.map((flow) => flow.job.id || '');
  ): Promise<Array<string> | null> {
    return this.queuesTestsService.createMinMaxBulkFlow(arrayOperationDto);
  }
}
