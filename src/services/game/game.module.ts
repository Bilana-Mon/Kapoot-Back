import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionModule } from '../question/question.module';
import { QuestionnaireModule } from '../questionnaire/questionnaire.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports:[PrismaModule,QuestionnaireModule, GameModule],
  controllers: [GameController],
  providers:[GameGateway, GameService]
})
export class GameModule {}
