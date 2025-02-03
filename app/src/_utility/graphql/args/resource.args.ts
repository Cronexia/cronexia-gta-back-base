import { ArgsType, Field } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';

import { ResourceInput } from '../inputs/resource.input';

// * 👷 Usage
//    import { ResourceInput } from '../_utility/graphql/inputs/resource.input';
//
//    @Args('resource', {
//      nullable: false,
//      type: () => ResourceInput,
//    })
//    resource: ResourceInput,

@ArgsType()
export class ResourceArgs {
  @Field(() => ResourceInput, {
    name: 'resource',
    description: `🔍 Search by resource : matricule, lastName or population`,
    nullable: false,
  })
  @IsDefined()
  resource: ResourceInput;
}
