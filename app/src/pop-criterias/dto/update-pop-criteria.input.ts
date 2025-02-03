import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePopCriteriaInput } from './create-pop-criteria.input';

@InputType()
export class UpdatePopCriteriaInput extends PartialType(
  CreatePopCriteriaInput,
) {
  // Ajout de l'identifiant unique
  //    Non, pas de modification de l'id par les utilisateurs
}
