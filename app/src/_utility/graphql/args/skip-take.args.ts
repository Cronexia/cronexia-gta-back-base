import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class SkipTakeArgs {
  @Field(() => Int, {
    name: 'skip',
    description: '⏭️ Skips the first N records',
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  skip?: number;

  @Field(() => Int, {
    name: 'take',
    description: '🔺 Return the N records max',
    nullable: true,
  })
  @IsInt()
  @IsOptional()
  take?: number;
}
