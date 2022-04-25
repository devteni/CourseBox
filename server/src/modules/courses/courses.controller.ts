import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../users/decorator/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
@UseGuards(JwtAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Roles(Role.LECTURER)
  @Post('/new')
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Roles(Role.LECTURER)
  @Get('lecturer/:userId')
  async findLecturerCourses(@Param('userId', ParseIntPipe) userId: number) {
    return await this.coursesService.findLecturerCourses(userId);
  }

  @Roles(Role.STUDENT)
  @Get('student/:deptId')
  async findStudentCourses(@Param('deptId', ParseIntPipe) deptId: number) {
    return await this.coursesService.findStudentCourses(deptId);
  }

  @Roles(Role.LECTURER)
  @UseInterceptors(FileInterceptor('courseMaterial'))
  @Post('upload')
  uploadFile(@Body() body, @UploadedFile() file) {
    console.log(body, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
