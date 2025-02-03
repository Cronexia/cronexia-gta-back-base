# 📝 Process ajout d'une 🛣️ Queues, de Jobs, de 🌊 Flows, etc.

Afin de rien oublier et de ne pas galérer à chaque fois

🏭🛣️🌊📌 BP complet : `cronexia-gta/__boilerplates/classname-kebab/queues`

---

## 🌲 Arborescence

👌 Eviter les confusions, tout regrouper dans un même sous dossier de la Classe ou implémenter la Queue.

👷 exemple avec CtCounter

- CtCounter
  - queues
    - 1 / constants
      - `queues.constant.ts`
      - `flows.constant.ts`
      - `sandboxed.constant.ts`
    - 4 / decorators
      - `inject-queues.decorator.ts`
      - `inject-flow-producers.decorator.ts`
    - 3 / dto
      - `counter-exec.args.ts`
    - 2 / enums
      - `counter-exec-jobs.enum.ts.enum.ts`
    - 6.1 / functions
      - 🌊 `create-children-jobs.ts`
    - 5 / interfaces (optionnel)
      - `counter-exec-job-progress.interface.ts`
    - XX / processors
      - `QUEUE_NAME.processor.ts`
    - XX / processors-sandboxed
      - `xxx.processor.ts`
    - 8 / `/ct-counter-queues.module.ts`
    - 7 / `/ct-counters-queues.resolver.ts`
    - 6 / `/ct-counters-queues.service.ts`

---

## 🪨 Constantes

Création d'un dossier dédié afin de stocker les différents noms `/constants`

- `queues.constant.ts`
- `flows.constant.ts`

---

## Définition des Noms de Jobs disponibles via une ENUM

Permet une gestion plus propre si plusiers workers

Dossier `enums` / `counter-exec-jobs.enum.ts.enum.ts`

---

## Définition des paramètres via un DTO

Dossier `dto` / `counter-exec.args.ts`

---

## 💉 Définition des décorateurs

Constantes contenant les `Arrow functions` d'injections de Queues.

Dossier `decorators`

- `inject-queues.decorator.ts`
- `inject-flow-producers.decorator.ts`

---

## Définition des interfaces

🌊 Flows (uniquement ?)

Permet de définir un meilleur modèle de Job, notamment pour:

- typage des résultats
- stockage des progrès

Dossier `interfaces` / `counter-exec-job-progress.interface.ts`

---

## Définition d'un ensemble Nest dédié

Afin de ne pas surcharger la classe de base, et de faciliter la gestion indépendantes des Queues.

Les services concernés de la classe seront injectés dans le service dédié des queues.

- `/ct-counter-queues.module.ts`
- `/ct-counters-queues.resolver.ts`
- `/ct-counters-queues.service.ts`

---

### Service

Création des Jobs aussi appelés *Producers* dans la doc NestJs

- Injection des Queues & Flows, dans le constructeur, via les décorateurs
- Création de méthodes de bases
  - 💦🧹☢️ Ajout des Queues.drains/clean/nuke spécifiques car injection locale
    - cf. `cronexia-gta/app/src/ct-counters/queues/ct-counter-queues.resolver.ts`
  - 🚨 Potentiellement plusieurs Job names
  - Création d'un Job
    - Ajout d'un job ~= this.audioQueue.add( JOB_NAME, ~datas, options)
      - `src/__tests-and-examples/_queues-nestjs-tests/_queues-nestjs-tests.service.ts`
  - ---
  - Création d'un Flow
    - Ajout d'un flow ~= this.myFlowProducer.add({...})
    - Ajout de multiples flow ~= this.myFlowProducer.addBulk([{...}, {...}])
      - `src/__tests-and-examples/_queues-tests/_queues-tests.service.ts`
    - 👶 Gestion des enfants
      - Dossier `functions`
        - ✂️ Découpage en batchs > `create-children-jobs.ts`

---

### Resolver

Création du Resolver.

- 💦🧹☢️ Ajout des routes pour service.drains/clean/nuke spécifiques car injection locale
- Par defaut, recommandé une route de test par Queue & Flows

- 🚨♻️ Ne pas tester l'ajout des jobs tout de suite !
  - Sans `processors` ils ne pourront pas être traités.

---

### Module

- Ajout service & resolver dans les providers
- Ajout service dans les exports
- Enregistrement des Queues & Flows dans les imports, via le module dédié
- 🚨⬇️ Chargement du **module** parent, si besoin des services
  - 🚨⬆️ Vérifier que son service est bien disponible à l'export
- 🚨 Chargement dans app.module
- ⏳ Ajout des Processors dans les providers, quand ils auront été créés
  - 🚨 Extension `.js` lors des **imports uniquement**, le fichier reste en `.ts`

---

## ⚙️ Processors

- 💬 Aussi appelés *Consumers* dans la doc NestJs
  - Uniformisés à Processors afin d'éviter les confusions.

- ⚡️🌊 Faciliter la parrallélisation des flows
  - 🛣️ Une Queue pour les process parents
  - 🛣️ Une Queue pour les process enfants
- ⚡️ Définition du parrallélisme, par processeur
  - *A priori* non gérable de manière globale avec NestJs
  - `concurrency: 4`
  - 📝❌⚡️☰ Non multi-thread si les process ne sont pas ⛱️ sandboxés

🚨 Un processeur **unique par Queue**, qui peut contenir un **switch** x cases **par Job**

Les traitements des jobs & flow sont dans le même dossier, les deux appelant des jobs devant être processés/consommés.

- Traitement des jobs des queues
  - `QUEUE_NAME.processor.ts`
- Traitement des jobs des flows
  - `QUEUE_NAME.processor.ts`
- 🚨⬆️ Ne pas oublier de rajouter les processors dans les providers du module
- 🚨⬇️ Chargement du service du module parent, si besoin
- 💥 Bien changer les noms des Queues dans `@Processor(💥COUNTER_EXEC, {`

---

### 📜 Gestion des logs des Processors

Logs par défaut, basiques, minimalistes

```ts
import { WorkerHost } from '@nestjs/bullmq';

export class CounterExecProcessor extends WorkerHost {
```

---

Logs personnalisés à la main, plus complets sans rentrer dans le spam

```ts
import { CustomLogsProcessor } from '🚨src/_queues/logs/custom-logs.processor';

export class CounterExecProcessor extends CustomLogsProcessor {
```

---

🔨 Création de logs dédiés pour un processeur: meilleur affichage des résultats

```ts
import { WorkerHost } from '@nestjs/bullmq';

export class CounterExecProcessor extends WorkerHost🚨 {
  async process(job: Job<any, any, string>): Promise<any> {
    // ...
  }

  // À rajouter après process(), dans la même classe
  // ! Events
  // https://api.docs.bullmq.io/interfaces/v4.WorkerListener.html
  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `@OnWorkerEvent('active') > Processing job ${job.id} of type ${job.name} with data.xxx : ${job.xxx}...`,
    );
  }

  // Possibilité de rajouter plusieurs
  @OnWorkerEvent('xxx')
  //    se référer à `src/_queues/logs/custom-logs.processor`
```

---

## ⛱️ sandboxed-workers

Fichiers javascripts dédiés

- Isolated process
  - ⚡️ Allows Multi-threading
  - 🚨 No Dependancy Injection
- 🚨 Ne pas oublier les processors dans le module
  - 🚨 Different loading `src/__tests-and-examples/_queues-nestjs-tests/_queues-nestjs-tests.module.ts`
    - Les fichiers ont une extensions `.ts` classique
    - Les Queues chargeront les fichiers compilés, l'extension lors du chargement sera donc `.js`

---

## 📌 Tests

[Bullboard](http://127.0.0.1:3000/queues/)

Ne pas oublier de vérifier le bon fonctionnement des

- Queues
- Flow
  - Enfants
