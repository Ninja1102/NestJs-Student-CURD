import { IsEmail, IsNotEmpty, IsInt, Min, Max, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;
  
  @IsInt({ message: 'Age must be a number' })
  age: number;
  
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;

  @IsNotEmpty()
  course: string;

  @IsNotEmpty()
  grade: string;
  
}
