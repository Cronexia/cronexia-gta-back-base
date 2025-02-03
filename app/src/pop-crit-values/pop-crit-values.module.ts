import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { PopCritValuesService } from './pop-crit-values.service';
import { PopCritValuesResolver } from './pop-crit-values.resolver';

import { PopCriteriasModule } from '../pop-criterias/pop-criterias.module';

@Module({
  exports: [PopCritValuesService],
  imports: [PrismaModule, forwardRef(() => PopCriteriasModule)],
  providers: [PopCritValuesResolver, PopCritValuesService],
})
export class PopCritValuesModule {}
