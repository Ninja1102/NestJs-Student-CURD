import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Course } from 'src/course/entities/course/course';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @ManyToMany(() => Course, course => course.students, { cascade: true })
  @JoinTable() // This adds a join table (student_courses)
  courses: Course[];
}
