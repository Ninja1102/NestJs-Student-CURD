import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student/student';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { Course } from 'src/course/entities/course/course'; // ✅ Import Course

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepo: Repository<Student>,
    
    @InjectRepository(Course) // ✅ Correctly inject Course repository
    private courseRepo: Repository<Course>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const courses = await this.courseRepo.findByIds(createStudentDto.courseIds || []);
    const student = this.studentRepo.create({ ...createStudentDto, courses });
    return this.studentRepo.save(student);
  }

  async findAll(): Promise<Student[]> {
    return this.studentRepo.find(); // only student details
  }

  async findOne(id: number): Promise<Student | null> {
    return this.studentRepo.findOne({ where: { id }, relations: ['courses'] });
  }
  

  update(id: number, data: Partial<Student>) {
    return this.studentRepo.update(id, data);
  }

  remove(id: number) {
    return this.studentRepo.delete(id);
  }
}
