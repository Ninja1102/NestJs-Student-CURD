// course.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Student } from 'src/student/entities/student/student';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  courseId: number;

  @Column()
  courseName: string;

  @Column()
  mentor: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToMany(() => Student, (student) => student.courses)
  @JoinTable()
  students: Student[];
  
  
}
