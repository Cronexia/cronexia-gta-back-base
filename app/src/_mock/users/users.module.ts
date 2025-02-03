import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaModule } from '../../_prisma/prisma.module';

@Module({
  controllers: [UsersController],
  imports: [PrismaModule],
  providers: [UsersService],
  // * Rendre accessible à la stratégie de Auth, afin de pouvoir valider
  exports: [UsersService],
})
export class UsersModule {}
