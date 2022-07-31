import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './services/user/user.module';
import { AuthModule } from './auth/auth.module';
import { QuestionnaireController } from './services/questionnaire/questionnaire.controller';
import { QuestionnaireModule } from './services/questionnaire/questionnaire.module';
import { QuestionModule } from './services/question/question.module';
import { QuestionController } from './services/question/question.controller';
import { AnswerModule } from './services/answer/answer.module';
import { AnswerController } from './services/answer/answer.controller';


@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, QuestionnaireModule, QuestionModule, AnswerModule],
  controllers: [AppController, QuestionnaireController, QuestionController, AnswerController],
  providers: [AppService,],
})
export class AppModule { }
