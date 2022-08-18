import { Module } from '@nestjs/common';
import { QuestionModule } from '../question/question.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports:[QuestionModule],
  controllers: [GameController],
  providers:[GameGateway]
})
export class GameModule {}
