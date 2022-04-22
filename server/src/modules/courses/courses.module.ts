import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../users/guards/roles.guard';

@Module({
  controllers: [CoursesController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CoursesService,
  ],
})
export class CoursesModule {}
