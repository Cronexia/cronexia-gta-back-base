import {
  // HttpAdapterHost,
  NestFactory,
  Reflector,
} from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

// * 🌐🐛📜 / GraphQL / Better error management
// 💩 KO avec GraphQL ou manque de configuration
// import { PrismaClientExceptionFilter } from 'nestjs-prisma';
// import { HttpExceptionFilter } from './_utility/filters/exception/http-exception.filter';
// cf.    cronexia-gta/app/src/_utility/filters/exception/prisma-exception.filter.ts
import { PrismaClientExceptionFilter } from './_utility/filters/exception/prisma-exception.filter';

// * 🤖 Swagger > Use CLI Plugin
//    see   https://docs.nestjs.com/openapi/cli-plugin#using-the-cli-plugin
import metadata from './metadata';

// * ⚡️ Compression
import compression from '@fastify/compress';
// import { constants } from 'zlib';

// * 🌐🕒 Explicitly set the timezone
process.env.TZ = `Europe/Paris`;

// * Allow the use of BigInt in API calls (add to toJSON())
import './utils.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // * 📜 Log routes accesses in terminal console
      logger: true,
    }),
  );

  // * Add validation pipes (~= API controls before adding to database)
  //    transform > Automatically transform payloads to be objects typed according to their DTO classes
  //    whitelist > Removes property without decorator, excluding fields data overload if not explicitly defined
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // * Interceptor usage, in order to be able to access req/res contents
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // * Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Cronexia / GTA / API')
    .setDescription(`List of all APIs' endpoints`)
    .setVersion('0.1')
    // * 🔐 Authorize Auth token creation & usage in Swagger
    .addBearerAuth()
    .build();

  // 🤖 Swagger > Use CLI Plugin
  await SwaggerModule.loadPluginMetadata(metadata);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // * Exceptions custom management : better HttpStatus on errors through nestjs-prisma package
  //    @see  https://nestjs-prisma.dev/docs/exception-filter/
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  // * ⚡️ Use compression
  await app.register(compression, {
    // * Compression options
    // brotliOptions: {
    //   params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
    // },
    // encodings: ['gzip', 'deflate'],
  });

  await app.listen(3000);
}
bootstrap();
