// src/users/dto/create-user.dto.ts

import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  /**
   * The name of the user
   * @example "Maxime"
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
