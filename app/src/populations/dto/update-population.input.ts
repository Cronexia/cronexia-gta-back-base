import { InputType, PartialType } from '@nestjs/graphql';
import { CreatePopulationInput } from './create-population.input';

@InputType()
export class UpdatePopulationInput extends PartialType(CreatePopulationInput) {
  // Ajout de l'identifiant unique
  //    Non, pas de modification de l'id par les utilisateurs
}
