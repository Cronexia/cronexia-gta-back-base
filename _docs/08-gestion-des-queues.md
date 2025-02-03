# 🛣️ Gestion des queues

Afin de fournir une meilleure gestion des performances & RAM pour les compteurs

📝 Docs

- [NestJs > queues](https://docs.nestjs.com/techniques/queues)
- [Doc BullMQ](https://docs.bullmq.io/)

---

Notes:

- a moitié maintenu, pas le temps, a l'arrache, désolay
- exemples passés dans `cronexia-gta/app/src/__tests-and-examples`
  - dans des modules dédiés
    - 1 tuto d'un mec dev.to
    - tuto nestjs

---

## Installation

En suivant la doc NestJs

```bash
bun add @nestjs/bullmq bullmq
```

Once the installation process is complete, we can import the BullModule into the root AppModule.

Note max:

- Actuellement connecté sur le Redis de cache de l'app
  - Si cela pose des soucis, monter une instance de Redis dédiée

---

Installation pas claire sur la ou on doit poser le code des queues.

- 📝 [dev.to > Queuing jobs in NestJS using @nestjs/bullmq package](https://dev.to/railsstudent/queuing-jobs-in-nestjs-using-nestjsbullmq-package-55c1)
  - ✅📌 Test du repo avant de se lancer
  - Ajout dans `cronexia-gta/app/src/_queues` avec un module de test inclus
    - ✅ Tout récupérer, écrémer et faire tourner
    - ✅ Structure en place
    - ✅ Pas d'erreurs de compilation
    - Mais l'appli du mec tourne via express & POST
      - Décliner pour GraphQL

cf. `cronexia-gta/app/src/_queues-tests`

- ✅ nest generate resource
- ✅ resolver & route de base
- rapatriement
- ✅📌 Test

---

## Mise en place des queues

Avec ordres de priorités, afin de ne plus misérer lors des prochaines implémentations

En trois étapes :

1. UNE SEULE FOIS : Création du module réutilisable
   1. `app/src/_queues`
   2. (non détaillé ici, pas besoin)
2. 🥇 Définir la structure d'un module qui définira les queues & jobs
3. 🥈 Affecter des jobs

---

🥇 Structure

### Définition des noms des queues & flow via des constantes

Stockés sous forme de caractères, mais plus propre & réutilisable

```js
// src/_queues-tests/constants/queues.constant.ts
export const ONE_QUEUE_NAME = 'one-queue-name';
export const ANOTHER_QUEUE_NAME = 'another-queue-name';
```

---

```js
// src/_queues-tests/constants/flows.constant.ts
export const ONE_FLOW_NAME = 'one-flow-name';
```

---

### Définition des Noms de Jobs disponibles via une ENUM

BullMQ traite les différents job processés via un switch.

On définit une ENUM afin de garder l'ensemble propre

```js
// src/_queues-tests/enums/job-names.enum.ts
export enum JOB_NAMES {
  SUM = 'SUM',
  SUBTRACT = 'SUBTRACT',
  MULTIPLY = 'MULTIPLY',
  DIVISION = 'DIVISION',
}
```

---

### Définition des paramètres via un DTO

Permet de définir les entrées typées pour un type de Job

```js
// src/_queues-tests/dtos/job-params.dto.ts
import { ArgsType, Field, Float } from '@nestjs/graphql';
import { IsDefined, IsNumber } from 'class-validator';

@ArgsType()
export class JobParamsArgs {
  @Field(() => Float, {
    name: 'num',
    description: 'First number value',
    nullable: true,
  })
  @IsDefined()
  @IsNumber()
  num: number;

  @Field(() => Float, {
    name: 'num2',
    description: 'Second number value',
    nullable: true,
  })
  @IsDefined()
  @IsNumber()
  num2: number;
}
```

---

### Créer les processors

Note: La doc de Nest diffère pas mal, voir pour terminr ça puis mettre en place l'exemple de Nest

#### Gestion des logs/events

```js
// src/_queues-tests/processors/worker-host.processor.ts
// ! ♻️ A priori réutilisable peut importe le job ?
import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export abstract class WorkerHostProcessor extends WorkerHost {
  protected readonly logger = new Logger(WorkerHostProcessor.name);

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    const { id, name, queueName, finishedOn, returnvalue } = job;
    const completionTime = finishedOn ? new Date(finishedOn).toISOString() : '';
    this.logger.log(
      `Job id: ${id}, name: ${name} completed in queue ${queueName} on ${completionTime}. Result: ${returnvalue}`,
    );
  }

  @OnWorkerEvent('progress')
  onProgress(job: Job) {
    const { id, name, progress } = job;
    this.logger.log(`Job id: ${id}, name: ${name} completes ${progress}%`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    const { id, name, queueName, failedReason } = job;
    this.logger.error(`Job id: ${id}, name: ${name} failed in queue ${queueName}. Failed reason: ${failedReason}`);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    const { id, name, queueName, timestamp } = job;
    const startTime = timestamp ? new Date(timestamp).toISOString() : '';
    this.logger.log(`Job id: ${id}, name: ${name} starts in queue ${queueName} on ${startTime}.`);
  }
}
```

---

#### Gestion des calculs a exécuter en eux-même

Réutilisation de l'esemble de ce qui a été défini avant

```js
// src/_queues-tests/processors/first-queue.processor.ts
import { Processor } from '@nestjs/bullmq';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Job } from 'bullmq';

import { ONE_QUEUE_NAME, ANOTHER_QUEUE_NAME } from '../constants/queues.constant';
import { JobParamsDto } from '../dtos/job-params.dto';
import { JOB_NAMES } from '../enums/job-names.enum';
import { WorkerHostProcessor } from './worker-host.processor';

@Processor(ONE_QUEUE_NAME)
@Injectable()
export class FirstQueueProcessor extends WorkerHostProcessor {
  process(job: Job<JobParamsDto, number, string>): Promise<number> {
    const { num, num2 } = job.data;
    switch (job.name) {
      case JOB_NAMES.SUM:
        return Promise.resolve(num + num2);
      case JOB_NAMES.SUBTRACT:
        return Promise.resolve(num - num2);
      case JOB_NAMES.MULTIPLY:
        return Promise.resolve(num * num2);
      case JOB_NAMES.DIVISION:
        if (num2 === 0) {
          throw new BadRequestException('Division by zero error');
        }
        return Promise.resolve(num / num2);
    }
    throw new BadRequestException(`Unknown job name: ${job.name}`);
  }
}
```

---

### Utilisation dans le module

- imports > Inscription des Queues / Flows via le module de Queues dédié
- providers > Ajout du processeur qui fait le boulot

Module > `cronexia-gta/app/src/_queues-tests/_queues-tests.module.ts`

```js
import { Module } from '@nestjs/common';
import { QueuesTestsService } from './_queues-tests.service';
import { QueuesTestsResolver } from './_queues-tests.resolver';

import { QueueModule } from '../_queues/queue-board.module';
import { ONE_QUEUE_NAME, ANOTHER_QUEUE_NAME } from './constants/queues.constant';
// import { ONE_FLOW_NAME } from './constants/flows.constant';
import { FirstQueueProcessor } from './processors/first-queue.processor';


@Module({
  imports: [
    QueueModule.register({
      // On passe des strings, qui servent de référence
      queues: [
        ONE_QUEUE_NAME,
        // ANOTHER_QUEUE_NAME,
      ],
      // flows: [
      //   ONE_FLOW_NAME
      // ],
    }),
  ],
  providers: [QueuesTestsResolver, QueuesTestsService, FirstQueueProcessor],
})
export class QueuesTestsModule {}
```

---

🥈 Affectation des jobs

## Création d'un décorateur

Un peu gadget mais évite de se refader la syntaxe complexe

```js
// src/_queues-tests/decorators/inject-queue.decorator.ts
import { InjectQueue } from '@nestjs/bullmq';
import { ONE_QUEUE_NAME, ANOTHER_QUEUE_NAME } from '../constants/queues.constant';

export const InjectFirstQueue = () => InjectQueue(ONE_QUEUE_NAME);
export const InjectSecondQueue = () => InjectQueue(ANOTHER_QUEUE_NAME);
```

---

```js
// src/_queues-tests/decorators/inject-flow-producer.decorator.ts
import { InjectFlowProducer } from '@nestjs/bullmq';
import { ONE_FLOW_NAME } from '../constants/flows.constant';

export const InjectFisrtProducer = () => InjectFlowProducer(ONE_FLOW_NAME);
```

## Resolver, (enfin), utilisation

```js
import { Queue } from 'bullmq';
import { InjectFirstQueue } from './decorators/inject-queue.decorator';

@Resolver()
export class QueuesTestsResolver {
  constructor(
    private readonly queuesTestsService: QueuesTestsService,

    // Injection du décorateur dans le constructeur
    @InjectFirstQueue() private firstQueue: Queue,
  ) {}

  import { Resolver, Query, Args } from '@nestjs/graphql';
import { QueuesTestsService } from './_queues-tests.service';

import { Queue } from 'bullmq';
import { InjectFirstQueue } from './decorators/inject-queue.decorator';
import { JobParamsArgs } from './dtos/job-params.args';
import { JOB_NAMES } from './enums/job-names.enum'


@Resolver()
export class QueuesTestsResolver {
  constructor(
    private readonly queuesTestsService: QueuesTestsService,

    // Injection du décorateur dans le constructeur
    @InjectFirstQueue() private firstQueue: Queue,
  ) {}

  // 🗺️ Création de la route
  @Query(() => String, {
    name: 'startOneQueue',
    description: `📌🛣️ Test queues: Start one queue
    \n
    \n### Exemples d'utilisation
    \n#### 🌐 Requête
    \n
    \n { startOneQueue(num: 2, num2: 3) }
    `,
  })
  async startOneQueue(
    // ⚙️ Gather params
    @Args() jobParamsArgs: JobParamsArgs,
  ): Promise<string | null> {
    console.log('jobParamsArgs');
    console.log(jobParamsArgs);

    // 🛣️ Create job
    const job = await this.firstQueue.add(JOB_NAMES.SUM, jobParamsArgs);

    if (job.hasOwnProperty('id')) {
      return `✅🛣️ One job started, check progress on terminal.\nJob id : ${job.id}`;
    }else {
      return `🐛🛣️ startOneQueue > Problem creating job`;
    }
  }
}
```

---
---
---
---
---
---
---
---
---
---

## 🌊 Gestion des flow

Dans l'exemple, traité via un service dédié

---

### DTOs > Gestion des paramètres passés

classique

---

### Service

- Injection du décorateur dans le constructeur du service
- Première fonction createFlow
  - Paramètres
    - Passage du DTO
    - Passage des jobs possibles
  - const children = this.createChildrenJobs(dto, jobName);
    - Découpage en batchs
    - Passage des batchs au FlowProducer
      - ~création d'un job composé des atchs de jobs
    - Renvoie l'id du job parent
- Autre fonction qui traine
  - createMinMaxBulkFlow
    - ~même chose mais création d'ensembles de bulk d'enfants pour 2 fonctions différentes en même temps
    - const minChildren = this.createChildrenJobs(dto, MATH_ARRAY_OPS.MIN);
    - const maxChildren = this.createChildrenJobs(dto, MATH_ARRAY_OPS.MAX);
    - passage au producer via `addBulk`
      - 🚨 Renvoie un tableau de jobs

Les opérations sont traitées via un Processor dédié

    - utilisation d'une interface pour la gestion de la progression

export interface ComparisonJobProgress {
  data: number[];
  percentage: number;
}

pk pas

Ensuite récupération de tous les tableaux de résultats des batch

Et merge en un seul tableau

// math-array-merge.process.ts

When all children jobs complete successfully, parent job in the MATH_ARRAY_MERGE queue receives the children values through `Object.values(await job.getChildrenValues())`. 

---

### Injection du flow dans le module

```js
import { MATH_ARRAY_PRODUCER } from './constants/flows.constant';

@Module({
  imports: [
    QueueModule.register({
      // On passe des strings, qui servent de référence
      queues: [
        ONE_QUEUE_NAME,
        // ANOTHER_QUEUE_NAME,
        
        MATH_ARRAY_CHILD,
        MATH_ARRAY_MERGE,
      ],
      flows: [
        // ! 🚨
        MATH_ARRAY_PRODUCER
      ],
    }),
  ],
  providers: [QueuesTestsResolver, QueuesTestsService, FirstQueueProcessor],
})
export class QueuesTestsModule {}


import { Module } from '@nestjs/common';
import { QueuesTestsService } from './_queues-tests.service';
import { QueuesTestsResolver } from './_queues-tests.resolver';

import { QueueModule } from '../_queues/queue-board.module';
import {
  ONE_QUEUE_NAME,
  ANOTHER_QUEUE_NAME,
} from './constants/queues.constant';
import {
  MATH_ARRAY_PRODUCER,
  MATH_ARRAY_CHILD,
  MATH_ARRAY_MERGE,
} from './constants/flows.constant';
import { FirstQueueProcessor } from './processors/first-queue.processor';
import { MathArrayChildProcessor } from './processors/math-array-child.processor';
import { MathArrayMergeProcessor } from './processors/math-array-merge.processor';

@Module({
  imports: [
    QueueModule.register({
      // On passe des strings, qui servent de référence
      queues: [
        ONE_QUEUE_NAME,
        ANOTHER_QUEUE_NAME,
        // ! 🚨 Ne pas oublier de rajouter les éventuels autres flows requis/utilisés
        MATH_ARRAY_CHILD,
        MATH_ARRAY_MERGE,
      ],
      // !    🚨
      flows: [MATH_ARRAY_PRODUCER],
    }),
  ],
  providers: [
    QueuesTestsResolver,
    QueuesTestsService,
    FirstQueueProcessor,
    // ! 🚨 ET SURTOUT LES PROVIDERS
    MathArrayChildProcessor,
    MathArrayMergeProcessor,
  ],
})
export class QueuesTestsModule {}

```

HS

                    Du gras en plus dans src/queue-board/queue-board.module.ts

                    import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
                    import { BullBoardModule } from '@bull-board/nestjs';

                    ~interface de visualisation

                    [@bull-board/nestjs](https://www.npmjs.com/package/@bull-board/nestjs)

                    ```bash
                    bun add @bull-board/nestjs @bull-board/api @bull-board/fastify
                    ```

        Pas possible d'installer, @fastify/static en version 4 dans les dépendances des paquets
        Requis 5+

        HS même en installant à la racine

Tout reprendre rien modifier... sauf GQL

✅🐛 Ptet les processeurs à rajouter en tant que providers dans le module ?
  excepté WorkerHostProcessor ???

  C'était bien ça !

---
---
---

## 👀 Visualisation > package `@bull-board/nestjs`

Même pas envie de réfléchir vu que l'install via package passait pas à cause d'une dépendance pas a jour

Si le bail BullMQ tourne via Redis > ptet un container pour taper sur le Redis

[blah](https://hub.docker.com/r/deadly0/bull-board)

- 🐳 Ajouté a docker
  - Configuré afin de se connecter au redis
  - Tourne, mais ne récupère pas les Queues

Go check la doc, de mémoire y'avait ptet du gras à mettre dans NestJs

- [bull board](https://github.com/felixmosh/bull-board)
- NestJS specific setup
  - yeph here we gow
  - [doc](https://github.com/felixmosh/bull-board/tree/master/packages/nestjs#register-your-queues)

### Installation

```bash
# Ajout des paquets requis
## bun add @bull-board/nestjs @bull-board/api @bull-board/fastify ## Fastify HS, version 5 pas encore sur NestJs

# bun add @bull-board/nestjs @bull-board/api @bull-board/express # HS également vu qu'on a pas express...
```

---

### Register the root module

```ts
// cronexia-gta/app/src/app.module.ts

// * 🛣️🌊👀 Visu des jobs > UI
import { BullBoardModule } from '@bull-board/nestjs';
// HS, NestJs n'a pas encore la V5 de Fastify ou un truc du genre
// import { FastifyAdapter } from "@bull-board/fastify";
// import { ExpressAdapter } from '@bull-board/express';

@Module({
  imports: [
    // ...

    // * 🛣️🌊👀 Visu des jobs > UI
    BullBoardModule.forRoot({
      route: '/queues',
      // adapter: FastifyAdapter
      // adapter: ExpressAdapter,
    }),
  ]
})
```

---

## Register your queues

Recup de la mise en place du tuto/article `nestjs-bullmq-demo`.

---


💩 HS

Url censées être générées : http://127.0.0.1:3000/queues

Le title est la mais plein de 404, ptet pke pas express

[exemples](https://github.com/felixmosh/bull-board/tree/master/examples/with-nestjs)

Exemple compile meme pas -_-

---

On repart sur fastify

test sans installer @bull-board/fastify

✅ isok

Ptet essayer avec des version plus anciennes chp

https://www.npmjs.com/package/@bull-board/fastify

ptet maj ce package avant ? @nestjs/platform-fastify deja fait avant

Major prec

bun add @bull-board/fastify@5.23.0

✅ lel ca "a l"air" de marcher

euh bah ça marche, mais sans le conteneur

wtv

http://127.0.0.1:3000/queues

---
---
---

## Création de routes GQL custom afin de clean les jobs/logs

[bullmq doc yay](https://docs.bullmq.io/guide/queues/removing-jobs)

- Drain
- Clean
- Obliterate

allay

Fait mais HS

💩 HS: Besoin de register les Queues par Injection ~> @InjectQueue(AUDIO) private audioQueue: Queue,

`cronexia-gta/app/src/_queues/queues.resolver.ts`

Pas le temps youpi yay osef

---
---
---

Gestion de la `concurrency`

Pas de global
Pas lors de registerQueue

Dans la définition des consumers @Process

```js
@Process(
  'QUEUE_NAME',
  {
    concurrency: 4,
  }
)
```
