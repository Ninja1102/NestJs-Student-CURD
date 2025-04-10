import {Controller,Get,Post,Body,Param,Patch,Delete, UsePipes, ValidationPipe} from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './entities/student/student';
import { CreateStudentDto } from './dto/create-student.dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto/update-student.dto';

  
  @Controller('students')
  export class StudentController {
    constructor(private readonly studentService: StudentService) {}
  
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() createStudentDto: CreateStudentDto) {
      return this.studentService.create(createStudentDto);
    }
    
    @Get()
    findAll() {
      return this.studentService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.studentService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: UpdateStudentDto) {
      return this.studentService.update(+id, updateDto);
    }
    
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.studentService.remove(+id);
    }
}
  