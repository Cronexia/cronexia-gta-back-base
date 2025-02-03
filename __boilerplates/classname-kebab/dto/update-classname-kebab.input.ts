// CLASSNAME_MAJ_FIRST REMOVE
// CLASSNAME_FILE_KEBAB_CASE REMOVE

import { InputType, PartialType } from '@nestjs/graphql';
import { CreateCLASSNAME_MAJ_FIRSTInput } from './create-CLASSNAME_FILE_KEBAB_CASE.input';

@InputType()
export class UpdateCLASSNAME_MAJ_FIRSTInput extends PartialType(CreateCLASSNAME_MAJ_FIRSTInput) {
  // Ajout de l'identifiant unique
  //    Non, pas de modification de l'id par les utilisateurs
}
