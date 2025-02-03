# 🍻 SHAME

List of tasks to be re-done.

Sometimes we ain't got time, sometimes it just doesn't work with clean code.

---

🐛👌FIX: Linter > Files not in kebab-case

Il y a des fichiers qui ont leurs noms en camelCase, et d'autres en kebab-case, wtf

Cleaner > full kebab-case

Principalement dans les models ?

---

## Trouver pourquoi les imports ne fonctionnent qu'en chemins relatifs

```ts
// ❌👌
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// ✅
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
```

---

## Finir de virer swagger

`nest-cli.json`

```json
{
  "name": "@nestjs/swagger",
  "options": {
    "classValidatorShim": true,
    "introspectComments": true
  }
}
```

`main.ts` > artefacts

Cleaner doc ?

---

[Some medium article](https://medium.com/@refaat.alktifan/6-dev-hunter-mastering-nestjs-d48f5756c243)

## profiling tools

When it comes to optimizing the performance of a NestJS application, it’s important to identify any bottlenecks in the code and make changes to improve the overall performance. One way to identify bottlenecks is by using profiling tools.

Profiling tools allow you to monitor your application’s performance by analyzing its resource usage, including CPU, memory, and I/O. Here are some profiling tools you can use to identify bottlenecks and improve the performance of your NestJS application:

Node.js Profiler — This is a built-in profiling tool that comes with Node.js. It allows you to take snapshots of your application’s performance and analyze the results. You can use the profiler to identify functions that are taking up a lot of CPU time and optimize them.
Chrome DevTools — Chrome DevTools is a powerful tool that allows you to profile your NestJS application in the browser. It includes a built-in profiler that can be used to analyze CPU usage, memory usage, and network activity. You can also use the Timeline tab to identify bottlenecks in your application’s performance.
New Relic — New Relic is a performance monitoring tool that can be used to monitor the performance of your NestJS application. It provides real-time insights into your application’s performance and can help you identify bottlenecks and other performance issues.
PM2 — PM2 is a process manager for Node.js applications that includes a built-in monitoring feature. It provides real-time performance metrics for your application, including CPU and memory usage. You can use PM2 to identify bottlenecks in your application’s performance and make changes to improve its overall performance.
Trace — Trace is a performance monitoring tool that can be used to monitor the performance of your NestJS application. It provides real-time insights into your application’s performance and can help you identify bottlenecks and other performance issues.
By using these profiling tools, you can identify bottlenecks and other performance issues in your NestJS application and make changes to improve its overall performance.

## Optimization and performance

Optimization and performance are important factors to consider when building a production-ready application in NestJS. Here are some tips and techniques that you can use to improve the performance of your NestJS application:

Use Fastify: NestJS supports both the Express and Fastify servers, but Fastify is generally faster and more efficient than Express. You can use the Fastify adapter for NestJS by installing the fastify and @nestjs/platform-fastify packages, and then setting app.useFastify() in your main.ts file.
Implement Caching: Caching can significantly improve the performance of your NestJS application by reducing the amount of time it takes to fetch data from a database or external API. You can use libraries like cache-manager and nestjs-cache to implement caching in your application.
Optimize Database Queries: Slow database queries can be a major bottleneck in your application’s performance. Make sure to optimize your database queries by using indexes, optimizing your database schema, and using database-specific features like stored procedures.
Minimize HTTP Requests: Minimizing the number of HTTP requests made by your application can help improve its performance. You can do this by reducing the number of external API calls and by implementing server-side rendering for your application.
Use Lazy Loading: NestJS supports lazy loading, which can help reduce the initial startup time of your application by only loading the necessary modules and dependencies when they are needed. You can use the @nestjs/webpack package to enable lazy loading in your application.
Implement Compression: Enabling compression can help reduce the size of your application’s response payloads, which can improve the performance of your application. You can use libraries like compression and fastify-compress to implement compression in your application.
Optimize Images: Large image files can slow down your application’s performance. Make sure to optimize your images by compressing them and resizing them to the appropriate dimensions.
By following these tips and techniques, you can optimize the performance of your NestJS application and ensure that it is running efficiently in a production environment.
