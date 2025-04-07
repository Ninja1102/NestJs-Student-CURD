import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course/course';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';
import { Student } from 'src/student/entities/student/student';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const students = await this.studentRepo.findByIds(createCourseDto.studentIds || []);
    const course = this.courseRepo.create({ ...createCourseDto, students });
    return this.courseRepo.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepo.find(); // courses only
  }
  

  async findOne(id: number) {
    return this.courseRepo.findOne({
      where: { courseId: id },
      relations: ['student'], // if you want the student with the course
    });
  }
}
