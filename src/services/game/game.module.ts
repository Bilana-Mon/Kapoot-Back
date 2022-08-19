import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionModule } from '../question/question.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports:[PrismaModule,QuestionModule],
  controllers: [GameController],
  providers:[GameGateway, GameService]
})
export class GameModule {}
