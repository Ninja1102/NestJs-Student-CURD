import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course/course';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { Student } from 'src/student/entities/student/student';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Student])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
