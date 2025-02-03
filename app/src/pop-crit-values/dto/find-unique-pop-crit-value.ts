import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

// Dual type, but needs different names
@ArgsType()
@InputType('FindUniquePopCritValueInput')
export class FindUniquePopCritValue {
  @Field(() => String, {
    name: 'id',
    description: `🔍 Search by unique ID`,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  id?: string;

  // * Only unique values (ID or @unique)
  // /
}
