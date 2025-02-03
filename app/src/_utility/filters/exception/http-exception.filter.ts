// Filtre classique, adapté pour GraphQL
//    cf. NestJS > GQL > Other features > Exception filters
//    cf.   https://docs.nestjs.com/graphql/other-features#exception-filters

// ! 💩 Sert à rien vu que Prisma envoie ses propres erreurs

import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    console.log(gqlHost);

    return exception;
  }
}
