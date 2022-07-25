import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { QuestionnaireController } from './questionnaire.controller';
import { QuestionnaireService } from './questionnaire.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [QuestionnaireService],
  controllers: [QuestionnaireController],
  exports: [QuestionnaireService]
})
export class QuestionnaireModule { }
