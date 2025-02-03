import { ConfigModule } from '@nestjs/config';
import {
  // HttpStatus,
  HttpException,
  Module,
} from '@nestjs/common';

import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// * 🌐 GraphQL
// // 🐛 Seems to proc `RangeError: Maximum call stack size exceeded` for some recursive stuff ?
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { join } from 'path';
// 🤖 CLI Plugin generated
//      see   https://docs.nestjs.com/graphql/cli-plugin
import metadata from './metadata';
// ENUMs registering
import { ENUMsModule } from './_utility/graphql/enums/enums.module';

// 🐛 All servers running with GraphQL must have at least one @Query()
import { HelloModule } from './hello.module';

// * ORM Management
import { PrismaModule } from './_prisma/prisma.module';
// * ORM Prisma tutorial
import { ArticlesModule } from './_mock/articles/articles.module';
import { UsersModule } from './_mock/users/users.module';

// * 💩 / 🐛 Better errors from Prisma
// import { providePrismaClientExceptionFilter } from 'nestjs-prisma';

// * Auth management
import { AuthModule } from './auth/auth.module';

// * ⚡️🟥 Cache Management / Redis
import {
  CacheModule,
  // CacheInterceptor,
} from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';
// import { APP_INTERCEPTOR } from '@nestjs/core';

// * 🛣️🌊 Gestion des queues
import { BullModule } from '@nestjs/bullmq';
import { QueuesTestsModule } from './__tests-and-examples/_queues-tests/_queues-tests.module';
import { QueuesNestjsTestsModule } from './__tests-and-examples/_queues-nestjs-tests/_queues-nestjs-tests.module';

// * 🛣️🌊👀 Visu des jobs > UI
import { BullBoardModule, BullBoardServerAdapter } from '@bull-board/nestjs';
// 🚨 "@bull-board/fastify": "^6.5.3",
//    HS, NestJs n'a pas encore la V5 de Fastify ou un truc du genre
// ✅ "@bull-board/fastify": "5.23.0",
//    Utilisation de la précédente majeure
import { FastifyAdapter } from '@bull-board/fastify';
// import { ExpressAdapter } from '@bull-board/express';

// * Cronexia
import { PopulationsModule } from './populations/populations.module';
import { PopCriteriasModule } from './pop-criterias/pop-criterias.module';
import { PopCritValuesModule } from './pop-crit-values/pop-crit-values.module';

@Module({
  imports: [
    // * 🔐 Prisma tutorial, login & JWT module
    AuthModule,

    // * 🔧 Configuration
    ConfigModule.forRoot({
      cache: true,
      // * Specify one or multiple file path for environnement variables
      // envFilePath: '.env',
      validationSchema: Joi.object({
        // * 📌 Tests environnement variables
        // NODE_ENV: Joi.string()
        //   .valid('development', 'production', 'test', 'provision')
        //   .default('development'),
        // PORT: Joi.number().default(3000),
      }),
    }),

    // * 🌐 GraphQL, via Mercurius
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      // GraphQL schema generated on-the-fly in memory
      // autoSchemaFile: true,
      // * GraphQL schema generated in a file
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: MercuriusDriver,
      graphiql: true,
      // 🤖 CLI Plugin generated
      metadata,
      // Sort the GraphQL schema lexicographically
      sortSchema: true,

      // * 🌐🐛📜 / GraphQL / Better error management
      // cf.    cronexia-gta/app/src/_utility/filters/exception/prisma-exception.filter.ts
      // Tutoriel pour Apollo :/
      // useFactory: (config: ConfigService) => {
      //   return {
      //     // ...
      //     formatError: (error) => {
      //       const originalError = error.extensions
      //         ?.originalError as OriginalError;
      //
      //       if (!originalError) {
      //         return {
      //           message: error.message,
      //           code: error.extensions?.code,
      //         };
      //       }
      //       return {
      //         message: originalError.message,
      //         code: error.extensions?.code,
      //       };
      //     },
      //   };
      // },

      // SO / https://stackoverflow.com/questions/61045881/why-arent-nestjs-graphql-validation-errors-placed-in-the-error-message-field
      // errorFormatter: (execution) => {
      //   const [error] = execution.errors; // take first error
      //   console.log('app.module');
      //   console.log(error);
      //   console.log('---');
      //   const originalError = error?.originalError;
      //   if (originalError instanceof HttpException)
      //     return {
      //       statusCode: originalError.getStatus(),
      //       response: { data: originalError.getResponse() as any },
      //     };
      //   return { statusCode: 500, response: execution };
      // },

      errorFormatter: (execution) => {
        const [error] = execution.errors; // take first error
        console.log('More details');
        console.log('---');
        console.log(error);
        console.log('---');
        console.log('---');
        console.log('---');
        const originalError = error?.originalError;

        // 🧹🌐 Cleaner le message d'erreur, moins "dev"
        if (originalError instanceof HttpException) {
          const errorsMore: any = originalError.getResponse();
          errorsMore.details.paths = error.path.join(', ');

          return {
            statusCode: originalError.getStatus(),
            response: {
              // * Possibilité de passer soit en data soit en errors
              // data: originalError.getResponse() as any,
              // errors: originalError.getResponse() as any,
              errors: errorsMore,
            },
          };
        }
        return { statusCode: 500, response: execution };
      },
    }),

    // * ⚡️🟥 Cache Management / Redis
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async () => {
        const ttl = 30 * 60 * 1000; // 30 mn (x 60sec x ms)
        const max = 10000; // maximum number of items in cache
        const store = await redisStore({
          ttl,
          // socket: {
          //   host: 'localhost',
          //   port: 6379,
          // },
          // * 🔑 Use uri instead of socket to provide credentials
          // url: 'redis://bob:bof@localhost:6379',
          // TODO: ! 🐛 Sometimes username isn't taken into account, use default for dev
          //              https://github.com/redis/node-redis/issues/1591#issuecomment-812672883
          url: 'redis://default:bof@localhost:6379',
        });

        return { store, ttl, max };
      },
    }),

    // * 🛣️🌊 Gestion des queues & jobs
    BullModule.forRoot({
      // Connexion à 🟥 Redis, requise
      connection: {
        host: 'localhost',
        // port: 6379,
        // 🚨 Dedicated Redis container instance, alternative port
        port: 6381,
        // username: 'default',
        password: 'bof',
      },
      defaultJobOptions: {
        removeOnComplete: 1000,
        removeOnFail: 5000,
        attempts: 3,
      },
    }),
    QueuesTestsModule,
    QueuesNestjsTestsModule,

    // * 🛣️🌊👀 Visu des jobs > UI
    BullBoardModule.forRoot({
      route: '/queues',
      // adapter: FastifyAdapter,
      adapter: FastifyAdapter as unknown as new () => BullBoardServerAdapter,
      // adapter: ExpressAdapter,
    }),

    // ---

    // * Cronexia
    ArticlesModule,
    ENUMsModule,
    HelloModule,
    PrismaModule,
    UsersModule,
    PopulationsModule,
    PopCriteriasModule,
    PopCritValuesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // v Better errors from Prisma
    // cf.   https://nestjs-prisma.dev/docs/exception-filter/
    // 💩
    // providePrismaClientExceptionFilter(),
    // providePrismaClientExceptionFilter({
    //   //  Provide your own error code mapping,
    //   //     if you like to catch additional Prisma Client Errors or when you need to change the HttpStatus

    //   //  Prisma Error Code: HTTP Status Response
    //   P2000: HttpStatus.BAD_REQUEST,
    //   P2002: HttpStatus.CONFLICT,
    //   P2025: HttpStatus.NOT_FOUND,
    // }),

    // * 💩⚡️🟥 Cache Management / Redis // Everywhere automatically
    //          https://docs.nestjs.com/techniques/caching#auto-caching-responses
    //    WARNING
    //    In GraphQL applications, interceptors are executed separately for each field resolver.
    //    Thus, CacheModule (which uses interceptors to cache responses) will not work properly.
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
