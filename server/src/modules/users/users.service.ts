import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { randomNumber } from 'src/utils/randomNumber';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: createUserDto.email,
      },
    });
    if (!existingUser) {
      const uniqueNumber = randomNumber(12);
      const salt = 10;
      const password = createUserDto.password;
      const hashedPass = await bcrypt.hash(password, salt);
      return this.prisma.user.create({
        data: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          password: hashedPass,
          email: createUserDto.email,
          department: createUserDto.department.toLowerCase(),
          school: createUserDto.school.toLowerCase(),
          role: createUserDto.role,
          uniqueNumber: uniqueNumber,
        },
      });
    } else throw new HttpException('User already exists', HttpStatus.FORBIDDEN);
  }

  findOne(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
