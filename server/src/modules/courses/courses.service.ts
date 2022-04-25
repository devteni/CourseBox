import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}
  create(createCourseDto: CreateCourseDto) {
    // return await this.prisma.course.create({
    //   data
    // })
  }

  async findLecturerCourses(userId: number) {
    return await this.prisma.course.findMany({
      where: {
        userId: userId,
      },
    });
  }
  async findStudentCourses(deptId: number) {
    return await this.prisma.course.findMany({
      where: {
        departmentId: deptId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
