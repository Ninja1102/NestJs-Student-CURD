// create-course.dto.ts
import { IsNotEmpty, IsArray, IsInt } from 'class-validator';

export class CreateCourseDto {
  @IsNotEmpty()
  courseName: string;

  @IsNotEmpty()
  mentor: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;

  @IsArray()
  @IsInt({ each: true })
  studentIds: number[];  // Accepts array of student IDs
}
