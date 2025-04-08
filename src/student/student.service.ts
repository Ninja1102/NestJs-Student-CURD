import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student/student';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { Course } from 'src/course/entities/course/course'; // ✅ Import Course
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

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
  
  async update(id: number, updateDto: UpdateStudentDto): Promise<Student> {
    const student = await this.studentRepo.findOne({ where: { id }, relations: ['courses'] });
  
    if (!student) {
      throw new Error(`Student with ID ${id} not found`);
    }
  
    // If courseIds are present, update the course relationship
    if (updateDto.courseIds) {
      const courses = await this.courseRepo.findByIds(updateDto.courseIds);
      student.courses = courses;
    }
  
    // Update other fields
    Object.assign(student, updateDto);
  
    return this.studentRepo.save(student);
  }
  
  
  
  async remove(id: number) {
    const student = await this.studentRepo.findOne({
      where: { id },
      relations: ['courses'],
    });
  
    if (student) {
      // Remove relation to courses first
      student.courses = [];
      await this.studentRepo.save(student);
    }
  
    return this.studentRepo.delete(id);
  }
  
}
