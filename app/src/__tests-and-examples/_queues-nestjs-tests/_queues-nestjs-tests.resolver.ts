import { Resolver, Query } from '@nestjs/graphql';
import { QueuesNestjsTestsService } from './_queues-nestjs-tests.service';

@Resolver()
export class QueuesNestjsTestsResolver {
  constructor(
    private readonly queuesNestjsTestsService: QueuesNestjsTestsService,
  ) {}

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'addOneJob',
    description: `📌🛣️ Test queues: Add one job
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { addOneJob }
    `,
  })
  async addOneJob(): Promise<string | null> {
    // 🛣️ Create job
    return await this.queuesNestjsTestsService.addOneJob();
  }

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'addMultipleJobsInParrallel',
    description: `📌🛣️ Test queues: Add multiple jobs in parrallel
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { addMultipleJobsInParrallel }
    `,
  })
  async addMultipleJobsInParrallel(): Promise<string | null> {
    // 🛣️ Create job
    return await this.queuesNestjsTestsService.addMultipleJobsInParrallel();
  }

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'addMultipleJobsToSandboxedWorker',
    description: `📌🛣️ Test queues: Add multiple jobs to a ⛱️ sandboxed worker
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { addMultipleJobsToSandboxedWorker }
    `,
  })
  async addMultipleJobsToSandboxedWorker(): Promise<string | null> {
    // 🛣️ Create job
    return await this.queuesNestjsTestsService.addMultipleJobsToSandboxedWorker();
  }

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'addMultipleJobsToMultipleSandboxedWorker',
    description: `📌🛣️ Test queues: Add multiple jobs to multiples ⛱️ sandboxeds workers
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { addMultipleJobsToMultipleSandboxedWorker }
    `,
  })
  async addMultipleJobsToMultipleSandboxedWorker(): Promise<string | null> {
    // 🛣️ Create job
    return await this.queuesNestjsTestsService.addMultipleJobsToMultipleSandboxedWorker();
  }

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'addMultipleJobsInParrallelDifferentWorkersNoSandbox',
    description: `📌🛣️ Test queues: Add multiple jobs to multiples NON sandboxeds workers
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { addMultipleJobsInParrallelDifferentWorkersNoSandbox }
    `,
  })
  async addMultipleJobsInParrallelDifferentWorkersNoSandbox(): Promise<
    string | null
  > {
    // 🛣️ Create job
    return await this.queuesNestjsTestsService.addMultipleJobsInParrallelDifferentWorkersNoSandbox();
  }
}
