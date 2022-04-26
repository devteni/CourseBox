import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCourseDto, CreateCourseMaterial } from './dto/create-course.dto';
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

  async uploadCourseMaterial(payload: CreateCourseMaterial) {
    const courseMaterial = await this.prisma.courseMaterial.create({
      data: {
        title: payload.title,
        description: payload.description,
        courseId: payload.courseId,
      },
    });
    const file = await this.prisma.file.create({
      data: {
        fileName: payload.file.originalname,
        url: payload.file.path,
      },
    });
    const updatedCourseMaterial = await this.prisma.courseMaterial.update({
      where: {
        id: courseMaterial.id,
      },
      data: {
        file: { connect: { id: file.id } },
      },
    });
    await this.prisma.file.update({
      where: {
        id: file.id,
      },
      data: {
        courseMaterialId: updatedCourseMaterial.id,
      },
    });
    // console.log('na here', courseMaterial.fileId);
    return courseMaterial;
  }

  async fetchCourseMaterials(payload) {
    const courseMaterials = await this.prisma.courseMaterial.findMany({
      where: {
        courseId: payload.courseId,
      },
    });
    return courseMaterials;
  }
}
