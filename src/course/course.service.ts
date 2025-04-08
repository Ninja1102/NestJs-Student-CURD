import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    const students = await this.studentRepo.findByIds(createCourseDto.studentIds);
    const course = this.courseRepo.create({ ...createCourseDto, students });
    return this.courseRepo.save(course);
  }
  

  async findAll(): Promise<Course[]> {
    return this.courseRepo.find(); // courses only
  }
  

  async findOne(id: number): Promise<Course> {
    try {
      const course = await this.courseRepo.findOne({
        where: { courseId: id },
        relations: ['students'],
      });
  
      if (!course) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
  
      return course;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async update(id: number, updateDto: Partial<Course>): Promise<Course> {
    await this.courseRepo.update(id, updateDto);
    return this.findOne(id); // returns updated data
  }
  
  async remove(id: number) {
    const course = await this.courseRepo.findOne({
      where: { courseId: id },
      relations: ['students'],
    });
  
    if (course) {
      // Remove relation to students first
      course.students = [];
      await this.courseRepo.save(course);
    }
  
    return this.courseRepo.delete(id);
  }
  
  
  
}
