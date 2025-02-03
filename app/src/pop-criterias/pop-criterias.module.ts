import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { PopCriteriasService } from './pop-criterias.service';
import { PopCriteriasResolver } from './pop-criterias.resolver';

// import { ResourceFieldsModule } from '../resource-fields/resource-fields.module';
import { PopCritValuesModule } from '../pop-crit-values/pop-crit-values.module';
import { PopulationsModule } from '../populations/populations.module';

@Module({
  exports: [PopCriteriasService],
  imports: [
    PrismaModule,
    // forwardRef(() => ResourceFieldsModule),
    forwardRef(() => PopCritValuesModule),
    forwardRef(() => PopulationsModule),
  ],
  providers: [PopCriteriasResolver, PopCriteriasService],
})
export class PopCriteriasModule {}
