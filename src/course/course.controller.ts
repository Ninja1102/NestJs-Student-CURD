import { Controller, Post, Body, Get } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto/create-course.dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() dto: CreateCourseDto) {
    return this.courseService.create(dto);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }
}
