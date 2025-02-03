import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

// * 👷 Usage: Service example
//          src/custom-fields-constraints/custom-fields-constraints.service.ts
// async customFieldsConstraintsUnitTest(): Promise<Array<UnitTestReturnModel>> {
//   const mockReturn = [
//     {
//       description: 'Test is ok',
//       expectedResult: true,
//       testResult: true,
//       unitTestValidated: '✅',
//     },
//     {
//       description: 'Test is KO',
//       expectedResult: true,
//       testResult: false,
//       unitTestValidated: '❌',
//     },
//     {
//       description: 'Test couldn t be executed',
//       expectedResult: true,
//       testResult: null,
//       unitTestValidated: '🐛 null',
//     },
//   ]
//   return mockReturn;
// }

@ObjectType()
export class UnitTestReturnModel {
  @Field(() => String, {
    name: 'description',
    description: 'Test description',
    nullable: false,
  })
  @IsDefined()
  @IsString()
  description: string;

  @Field(() => Boolean, {
    name: 'expectedResult',
    description:
      'Expected result of the test: true / false / null',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  expectedResult: boolean;

  @Field(() => Boolean, {
    name: 'testResult',
    description:
      'Actual result of the test: true / false / null',
    nullable: true,
  })
  @IsOptional()
  @IsBoolean()
  testResult?: boolean;

  @Field(() => String, {
    name: 'unitTestValidated',
    description:
      `Has the test been passed ? ✅ Yes / ❌ No / 🐛 Test couldn't be executed`,
    nullable: false,
  })
  @IsDefined()
  @IsString()
  unitTestValidated: string;
}
