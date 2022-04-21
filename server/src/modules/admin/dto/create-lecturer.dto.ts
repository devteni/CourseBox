import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createLecturerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  uniqueNumber: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  password: string;
  department: string;

  @IsString()
  role: string;

  @IsString()
  school: string;
}
