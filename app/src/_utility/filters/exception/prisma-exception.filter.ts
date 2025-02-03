// * 🌐🐛📜 / GraphQL / Better error management
// Medium > Nestjs Graphql logging and exception handling
//    Rare tutorial with Prisma error handling
//    cf.     https://medium.com/@shkim04/nestjs-graphql-logging-and-exception-handling-fe1f01bdf21e

import { GqlExceptionFilter } from '@nestjs/graphql';
import {
  Catch,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  ImATeapotException,
  NotFoundException,
  RequestTimeoutException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Prisma as PrismaClient } from '@prisma/client';

@Catch(PrismaClient.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements GqlExceptionFilter {
  catch(exception: PrismaClient.PrismaClientKnownRequestError): any {
    // Too much to manage by hand... for now
    //    https://www.prisma.io/docs/orm/reference/error-reference#prisma-client-query-engine

    console.log('---');
    console.log('PrismaClientExceptionFilter');
    console.log('---');
    console.log(exception);
    console.log('---');
    console.log('---');
    console.log('---');

    // NestJs HttpStatusCode conversions
    //    https://docs.nestjs.com/exception-filters

    switch (exception.code) {
      // * Error based on official documentation
      //      https://www.prisma.io/docs/orm/reference/error-reference#p2005

      // ! Common
      case 'P1000': {
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'Unauthorized',
          details: {
            description: `Authentication failed against database server at ${exception.meta.database_host}, the provided database credentials for ${exception.meta.database_user} are not valid. Please make sure to provide valid database credentials for the database server at ${exception.meta.database_host}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1001': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Can't reach database server at ${exception.meta.database_host}:${exception.meta.database_port} Please make sure your database server is running at ${exception.meta.database_host}:${exception.meta.database_port}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1002': {
        throw new RequestTimeoutException({
          statusCode: 408,
          message: 'Timeout',
          details: {
            description: `The database server at ${exception.meta.database_host}:${exception.meta.database_port} was reached but timed out. Please try again. Please make sure your database server is running at ${exception.meta.database_host}:${exception.meta.database_port}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1003': {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Not Found',
          details: {
            description: `
            Database ${exception.meta.database_file_name} does not exist at ${exception.meta.database_file_path}

            Database ${exception.meta.database_name}.${exception.meta.database_schema_name} does not exist on the database server at ${exception.meta.database_host}:${exception.meta.database_port}

            Database ${exception.meta.database_name} does not exist on the database server at ${exception.meta.database_host}:${exception.meta.database_port}
            `,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1008': {
        throw new RequestTimeoutException({
          statusCode: 408,
          message: 'Timeout',
          details: {
            description: `Operations timed out after ${exception.meta.time}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1009': {
        throw new ConflictException({
          statusCode: 409,
          message: 'Conflict',
          details: {
            description: `Database ${exception.meta.database_name} already exists on the database server at ${exception.meta.database_host}:${exception.meta.database_port}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1010': {
        throw new ForbiddenException({
          statusCode: 403,
          message: 'Forbidden',
          details: {
            description: `User ${exception.meta.database_user} was denied access on the database ${exception.meta.database_name}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1011': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Error opening a TLS connection: ${exception.meta.message}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1012': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `${exception.meta.full_error}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1013': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The provided database string is invalid. ${exception.meta.details}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1014': {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Not Found',
          details: {
            description: `The underlying ${exception.meta.kind} for model ${exception.meta.model} does not exist.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1015': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Your Prisma schema is using features that are not supported for the version of the database.
            Database version: ${exception.meta.database_version}
            Errors:
            ${exception.meta.errors}`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1016': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Your raw query had an incorrect number of parameters. Expected: ${exception.meta.expected}, actual: ${exception.meta.actual}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P1017': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Server has closed the connection.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }

      // ---

      // ! Prisma Client (Query Engine)
      case 'P2000': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The provided value for the column is too long for the column's type. Column: ${exception.meta.column_name}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2001': {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Not Found',
          details: {
            description: `The record searched for in the where condition (${exception.meta.model_name}.${exception.meta.argument_name} = ${exception.meta.argument_value}) does not exist.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2002': {
        // console.log();
        // console.log('PrismaExceptionFilter > P2002 > Conflict');
        // console.log();
        // console.log(exception);
        // console.log();

        const targets: Array<string> = exception.meta.target as unknown as Array<string>;

        throw new ConflictException({
          statusCode: 409,
          message: 'Conflict',
          // On peut passer d'autres trucs et les récupérer dans app.module yay
          details: {
            description: `${exception.meta.modelName} > (${targets.join(', ')}): La valeur doit être unique et celle ci est déjà présente en base de données.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2003': {
        throw new UnprocessableEntityException({
          statusCode: 422,
          message: 'Unprocessable Entity',
          details: {
            description: `🐛 Detailed error: ${exception.meta.cause}\n Note max: peut être déclenché lorsque la suppression de l'entrée rentre en conflit avec une contrainte de clé étrangère. Par exemple je supprime une définition de fonction qui est utilisée par une fonction (qui se retrouverait donc sans définition, ce qui est interdit).`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2004': {
        throw new ConflictException({
          statusCode: 409,
          message: 'Conflict',
          details: {
            description: `A constraint failed on the database: ${exception.meta.database_error}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2005': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The value ${exception.meta.field_value} stored in the database for the field ${exception.meta.field_name} is invalid for the field's type.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2006': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The provided value ${exception.meta.field_value} for ${exception.meta.model_name} field ${exception.meta.field_name} is not valid.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2007': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Data validation error ${exception.meta.database_error}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2008': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Failed to parse the query ${exception.meta.query_parsing_error} at ${exception.meta.query_position}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2009': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Failed to validate the query: ${exception.meta.query_validation_error} at ${exception.meta.query_position}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2010': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Raw query failed. Code: ${exception.meta.code}. Message: ${exception.meta.message}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2011': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Null constraint violation on the ${exception.meta.constraint}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2012': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Missing a required value at ${exception.meta.path}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2013': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Missing the required argument ${exception.meta.argument_name} for field ${exception.meta.field_name} on ${exception.meta.object_name}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2014': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The change you are trying to make would violate the required relation '${exception.meta.relation_name}' between the ${exception.meta.model_a_name} and ${exception.meta.model_b_name} models.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2015': {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Not Found Exception',
          details: {
            description: `A related record could not be found. ${exception.meta.details}`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2016': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Query interpretation error. ${exception.meta.details}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2017': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The records for relation ${exception.meta.relation_name} between the ${exception.meta.parent_name} and ${exception.meta.child_name} models are not connected.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2018': {
        throw new NotFoundException({
          statusCode: 404,
          message: 'Not Found Exception',
          details: {
            description: `The required connected records were not found. ${exception.meta.details}`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2019': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Input error. ${exception.meta.details}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2020': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Value out of range for the type. ${exception.meta.details}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2021': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The table ${exception.meta.table} does not exist in the current database.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2022': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The column ${exception.meta.column} does not exist in the current database.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2023': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Inconsistent column data: ${exception.meta.message}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2024': {
        throw new RequestTimeoutException({
          statusCode: 408,
          message: 'Timeout',
          details: {
            description: `Timed out fetching a new connection from the connection pool.
            More info: http://pris.ly/d/connection-pool
            Current connection pool timeout: ${exception.meta.timeout},
            Connection limit: ${exception.meta.connection_limit}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2025': {
        throw new NotFoundException(
          // 'Cannot find',
          // The objectOrError argument defines the JSON response body or the message string.
          //    By default, the JSON response body contains two properties:
          //      statusCode: this will be the value 404.
          //      message: the string 'Not Found' by default; override this by supplying a string in the objectOrError parameter.
          {
            statusCode: 404,
            message: 'Not Found Exception',
            details: {
              description: `🐛 Detailed error: ${exception.meta.cause}`,
              prisma: {
                errorCode: exception.code,
                modelName: exception.meta.modelName,
              },
            },
          },
        );
      }
      case 'P2026': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `The current database provider doesn't support a feature that the query used: ${exception.meta.feature}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2027': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Multiple errors occurred on the database during query execution: ${exception.meta.errors}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2028': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Transaction API error: ${exception.meta.error}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2029': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Query parameter limit exceeded error: ${exception.meta.message}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2030': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Cannot find a fulltext index to use for the search, try adding a @@fulltext([Fields...]) to your schema.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2031': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Prisma needs to perform transactions, which requires your MongoDB server to be run as a replica set. See details: https://pris.ly/d/mongodb-replica-set.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2033': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `A number used in the query does not fit into a 64 bit signed integer. Consider using BigInt as field type if you're trying to store large integers.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2034': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Transaction failed due to a write conflict or a deadlock. Please retry your transaction.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2035': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Assertion violation on the database: ${exception.meta.database_error}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2036': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Error in external connector (id: ${exception.meta.id}).`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      case 'P2037': {
        throw new BadRequestException({
          statusCode: 400,
          message: 'Bad Request',
          details: {
            description: `Too many database connections opened: ${exception.meta.message}.`,
            prisma: {
              errorCode: exception.code,
              modelName: exception.meta.modelName,
            },
          },
        });
      }
      default:
        console.log(exception);
        throw new ImATeapotException(
          // 'Cannot find',
          // The objectOrError argument defines the JSON response body or the message string.
          //    By default, the JSON response body contains two properties:
          //      statusCode: this will be the value 404.
          //      message: the string 'Not Found' by default; override this by supplying a string in the objectOrError parameter.
          {
            statusCode: 418,
            message:
              '(default) Exception, ~garbage collector, Code Prisma non implémenté, cf. console',
            details: {
              description: `🐛 Detailed error: ${exception.meta.cause}`,
              prisma: {
                errorCode: exception.code,
                modelName: exception.meta.modelName,
              },
            },
          },
        );
    }

    return exception;
  }
}
