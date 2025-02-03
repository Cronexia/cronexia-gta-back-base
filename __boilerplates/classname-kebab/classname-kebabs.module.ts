// CLASSNAME_MAJ_FIRST REMOVE
// CLASSNAME_FILE_KEBAB_CASE REMOVE

// RELATION_MAJ_FIRST REMOVE
// RELATION_FILE_KEBAB_CASE REMOVE

import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { CLASSNAME_MAJ_FIRSTsService } from './CLASSNAME_FILE_KEBAB_CASEs.service';
import { CLASSNAME_MAJ_FIRSTsResolver } from './CLASSNAME_FILE_KEBAB_CASEs.resolver';

// import { RELATION_MAJ_FIRSTsModule } from '../RELATION_FILE_KEBAB_CASEs/RELATION_FILE_KEBAB_CASEs.module';
// import { RELATION_MAJ_FIRSTsModule } from '../RELATION_FILE_KEBAB_CASEs/RELATION_FILE_KEBAB_CASEs.module';

@Module({
  exports: [CLASSNAME_MAJ_FIRSTsService],
  imports: [
    PrismaModule,
    // forwardRef(() => RELATION_MAJ_FIRSTsModule),
    // forwardRef(() => RELATION_MAJ_FIRSTsModule),
  ],
  providers: [CLASSNAME_MAJ_FIRSTsResolver, CLASSNAME_MAJ_FIRSTsService],
})
export class CLASSNAME_MAJ_FIRSTsModule {}
