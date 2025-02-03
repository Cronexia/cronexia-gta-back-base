import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsOptional, IsString } from 'class-validator';

@InputType({
  description: `Select one or mutliple Resources. By matricule, socialSecurityNumber or lastName`,
})
export class ResourceInput {
  @Field(() => String, {
    name: 'matricule',
    description: 'Unique matricule of the 📁 Resource',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  matricule?: string;

  // 🔒️ Sensitive information, do not display or use as identifier
  // @Field(() => GraphQLBigInt, {
  //   name: 'socialSecurityNumber',
  //   description: 'Unique socialSecurityNumber of the 📁 Resource',
  //   nullable: true,
  // })
  // @IsOptional()
  // socialSecurityNumber?: bigint;

  @Field(() => String, {
    name: 'lastName',
    description:
      'Last name of the 📁 Resource. Can lead to homonyms (👪 multiple Resources)',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field(() => String, {
    name: 'populationName',
    description: 'Name of the 👪 Population. Can return multiple Resources',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  populationName?: string;

  @Field(() => [String], {
    name: 'ids',
    description: '🗃️ Array of String, containing Resources ids.',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  @IsArray()
  ids?: Array<string>;

  @Field(() => [String], {
    name: 'matricules',
    description: '🗃️ Array of String, containing Resources ids.',
    nullable: 'itemsAndList',
  })
  @IsOptional()
  @IsArray()
  matricules?: Array<string>;
}
