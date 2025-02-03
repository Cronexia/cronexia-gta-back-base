import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { PopulationsService } from './populations.service';
import { PopulationsResolver } from './populations.resolver';

import { PopCriteriasModule } from '../pop-criterias/pop-criterias.module';

@Module({
  exports: [PopulationsService],
  imports: [PrismaModule, forwardRef(() => PopCriteriasModule)],
  providers: [PopulationsResolver, PopulationsService],
})
export class PopulationsModule {}
