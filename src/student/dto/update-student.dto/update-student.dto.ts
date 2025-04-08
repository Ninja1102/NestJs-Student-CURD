import { IsEmail, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  courseIds?: number[]; // ✅ allow updating course list
}
