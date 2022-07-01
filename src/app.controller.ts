import {
  Controller,
} from '@nestjs/common';
@Controller()
export class AppController {
  constructor(
  ) { }

  // @Get('game/:id')
  // async getGameById(@Param('id') id: string): Promise<GameModel> {
  //   return this.GameService.game({ id: Number(id) });
  // }

  // @Get('games')
  // async getPlayedGames(): Promise<GameModel[]> {
  //   return this.GameService.games({
  //     where: {},
  //   });
  // }

  // @Get('filtered-games/:searchString')
  // async getFilteredGames(
  //   @Param('searchString') searchString: string,
  // ): Promise<GameModel[]> {
  //   return this.GameService.games({
  //     where: {
  //       OR: [
  //         {
  //           themes: {},
  //         },
  //         {
  //           finished: {},
  //         },
  //       ],
  //     },
  //   });
  // }

  // @Post('game')
  // async createGame(
  //   @Body() gameData: {  adminId: number, started: Date, finished: Date, players:number },
  // ): Promise<any> {
  //   const { adminId, started, finished, players } = gameData;
  // }

  

  // @Put('start-game/:id')
  // async startPost(@Param('id') id: string): Promise<GameModel> {
  //   return this.GameService.updateGame({
  //     where: { id: Number(id) },
  //     data: { started: new Date },
  //   });
  // }

  // @Delete('game/:id')
  // async deleteGame(@Param('id') id: string): Promise<GameModel> {
  //   return this.GameService.deleteGame({ id: Number(id) });
  // }
}