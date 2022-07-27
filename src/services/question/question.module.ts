import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService]
})
export class QuestionModule { }
