# Sandobxed processes

- 📝 Docs
  - [NestJs > Queues > Separate process](https://docs.nestjs.com/techniques/queues#separate-processes)
  - [BullMQ](https://docs.bullmq.io/guide/workers/sandboxed-processors)
    - [BullMQ tuto](https://blog.taskforce.sh/using-typescript-with-bullmq/)

Worker isolés, donc pas de Dependancy Injection, mais 'censés' pouvoir utiliser des GPU différents (multi-thread) 
