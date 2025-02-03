import { Module } from '@nestjs/common';
import { PrismaModule } from '../_prisma/prisma.module';
import { TestsAndExamplesService } from './tests-and-examples.service';
import { TestsAndExamplesResolver } from './tests-and-examples.resolver';
import { CachesModule } from '../caches/caches.module';

@Module({
  imports: [PrismaModule, CachesModule],
  providers: [TestsAndExamplesResolver, TestsAndExamplesService],
})
export class TestsAndExamplesModule {}
