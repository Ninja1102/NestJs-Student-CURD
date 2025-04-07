import { IsEmail, IsInt, IsOptional, IsNotEmpty, Min, Max } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  
  @IsOptional()
  @IsInt({ message: 'Age must be a number' })
  @Min(7, { message: 'Minimum age is 7' })
  @Max(25, { message: 'Maximum age is 25' })
  age: number;
  
  @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;
}
