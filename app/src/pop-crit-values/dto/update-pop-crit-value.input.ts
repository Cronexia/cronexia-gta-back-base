import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePopCritValueInput } from './create-pop-crit-value.input';

@InputType()
export class UpdatePopCritValueInput extends PartialType(
  CreatePopCritValueInput,
) {
  // Ajout de l'identifiant unique
  //    Non, pas de modification de l'id par les utilisateurs
}
