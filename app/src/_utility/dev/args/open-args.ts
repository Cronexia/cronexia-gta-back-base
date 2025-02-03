// * Straight open field in json format, to pass params straight to prisma client
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-scalars';

import { Prisma as PrismaClient } from '@prisma/client';

@ArgsType()
export class OpenArgs {
  @Field(() => GraphQLJSONObject, {
    name: 'anyOpen',
    description: `♾️ any params to Prisma Client, JSON format`,
    nullable: true,
  })
  @IsOptional()
  anyOpen?: PrismaClient.ResourceAvgAggregateInputType;
}
