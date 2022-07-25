import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './services/user/user.module';
import { AuthModule } from './auth/auth.module';
import { QuestionnaireController } from './services/questionnaire/questionnaire.controller';
import { QuestionnaireModule } from './services/questionnaire/questionnaire.module';


@Module({
  imports:[ConfigModule.forRoot(), UserModule, AuthModule, QuestionnaireModule],
  controllers: [AppController, QuestionnaireController],
  providers: [AppService,],
})
export class AppModule {}
