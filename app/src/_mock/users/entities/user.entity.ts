// src/users/entities/user.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  // ! Intercepteur > création d'une entité à partir de celle générée par Prisma
  // ! MAY avec l'intercepteur @Exclude
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  // ! Pas de @ApiProperty() afin de ne pas l'exposer sur swagger, donnée sensible
  //      Masqué mais toujours présent dans les retours
  // * Utilisation d'un intercepteur afin de le retirer des réponses
  @Exclude()
  password: string;
}
