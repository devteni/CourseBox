import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { PrismaService } from 'src/prisma.service';
import { createLecturerDto } from './dto/create-lecturer.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  create(data: CreateAdminDto) {
    return this.prisma.admin.create({ data });
  }

  login(payload: LoginAdminDto) {
    const user = this.prisma.admin.findFirst({
      where: {
        username: payload.username,
      },
    });
    if (user) return true;
    return false;
  }

  async createLecturer(payload: createLecturerDto) {
    const uniqueNumber = uuidv4();
    const salt = 10;
    const password = payload.password;
    const hashedPass = await bcrypt.hash(password, salt);
    return this.prisma.user.create({
      data: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        password: hashedPass,
        email: payload.email,
        department: payload.department,
        school: payload.school,
        role: payload.role.toLowerCase(),
        uniqueNumber: uniqueNumber,
      },
    });
  }
}
