import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { Student } from './student/entities/student/student';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'student_db',
      entities: [Student],
      autoLoadEntities: true,
      synchronize: true, // only for dev
    }),
    StudentModule,
  ],
})
export class AppModule {}
