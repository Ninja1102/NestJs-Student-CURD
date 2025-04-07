import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Student } from './entities/student/student';
import { Course } from 'src/course/entities/course/course';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Course])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
