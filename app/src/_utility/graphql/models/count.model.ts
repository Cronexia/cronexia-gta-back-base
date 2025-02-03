import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class CountModel {
  // * Reference
  @Field(() => Int, {
    description: 'Number of added entries.',
    name: 'count',
    nullable: false,
  })
  count: number;
}
