import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  uniqueNumber: string;

  @IsString()
  password: string;

  @IsString()
  department: string;

  @IsString()
  school: string;

  @IsString()
  role: string;
}
