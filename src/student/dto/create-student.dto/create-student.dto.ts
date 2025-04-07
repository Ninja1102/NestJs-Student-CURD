import { IsEmail, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  
  @IsInt({ message: 'Age must be a number' })
  @Min(7, { message: 'Minimum age is 7' })
  @Max(25, { message: 'Maximum age is 25' })
  age: number;
  
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;
  
}
