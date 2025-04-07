import { IsEmail, IsInt, IsOptional, IsNotEmpty, Min, Max, isString, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  
  @IsOptional()
  @IsInt({ message: 'Age must be a number' })
  age: number;
  
  @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  email: string;
}
