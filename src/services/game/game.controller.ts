import { 
    Controller,
    Get,
    Post,
    Put,
    Param,
    Body,
    Delete
 } from '@nestjs/common';
 import { GameService } from './game.service';
 import {Game as GameModel} from "@prisma/client";

@Controller('game')
export class GameController {
    constructor
        (
            private readonly gameService: GameService
        ) { }
    
  @Get('/:id')
  async getGameById(@Param('id') id: string): Promise<GameModel> {
    return this.gameService.game({ id: Number(id) });
  }

  @Get('/games')
  async getPlayedGames(): Promise<GameModel[]> {
    return this.gameService.games({
      where: {},
    });
  }

  @Get('/filtered-games/:searchString')
  async getFilteredGames(
    @Param('searchString') searchString: string,
  ): Promise<GameModel[]> {
    return this.gameService.games({
      where: {
        OR: [
          {
            finished: {},
          },
        ],
      },
    });
  }

  @Post()
  async createGame(
    @Body() gameData: {  adminId: number, started: Date, finished: Date, players:number },
  ): Promise<any> {
    const { adminId, started, finished, players } = gameData;
  }

  

  @Put('/start-game/:id')
  async startPost(@Param('id') id: string): Promise<GameModel> {
    return this.gameService.updateGame({
      where: { id: Number(id) },
      data: { started: new Date },
    });
  }

  @Delete('/:id')
  async deleteGame(@Param('id') id: string): Promise<GameModel> {
    return this.gameService.deleteGame({ id: Number(id) });
  }
}
