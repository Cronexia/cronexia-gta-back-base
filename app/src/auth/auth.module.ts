import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
// import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaModule } from '../_prisma/prisma.module';
// * Stratégie de validation du passeport
// import { UsersModule } from 'src/users/users.module';
import { UsersModule } from '../_mock/users/users.module';
import { JwtStrategy } from './jwt.strategy';

export const jwtSecret = 'zjP9h6ZI5LoSKCRj';

@Module({
  controllers: [AuthController],
  imports: [
    // * Auth
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '5m' }, // e.g. 30s, 7d, 24h
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
