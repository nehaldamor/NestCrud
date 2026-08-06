import { ParseIntPipe } from "@nestjs/common";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Role } from "@prisma/client";
export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsInt()
  age: number;
  @IsString()
  password: string;
  @IsOptional()
  @IsEnum(Role, {
    message: 'Role must be either ADMIN or USER',
  })
  role?: Role;
}