import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './services/user/user.service';
import { GameService } from './services/game/game.service';
import { User as UserModel, Game as GameModel } from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly GameService: GameService,
  ) { }

  @Get('game/:id')
  async getGameById(@Param('id') id: string): Promise<GameModel> {
    return this.GameService.game({ id: Number(id) });
  }

  @Get('games')
  async getPlayedGames(): Promise<GameModel[]> {
    return this.GameService.games({
      where: {},
    });
  }

  @Get('filtered-games/:searchString')
  async getFilteredGames(
    @Param('searchString') searchString: string,
  ): Promise<GameModel[]> {
    return this.GameService.games({
      where: {
        OR: [
          {
            themes: {},
          },
          {
            finished: {},
          },
        ],
      },
    });
  }

  @Post('game')
  async createGame(
    @Body() gameData: {  adminId: number, started: Date, finished: Date, players: number },
  ): Promise<GameModel> {
    const { adminId, started, finished, players } = gameData;
    return this.GameService.createGame({
      Admin: {
        connect: {id: adminId},
      },
      started,
      finished,
      // players ????
    });
  }

  @Post('user')
  async signupUser(
    @Body() userData: { nickname?: string; email: string, password: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Put('start/:id')
  async startPost(@Param('id') id: string): Promise<GameModel> {
    return this.GameService.updateGame({
      where: { id: Number(id) },
      data: { started: new Date },
    });
  }

  @Delete('game/:id')
  async deleteGame(@Param('id') id: string): Promise<GameModel> {
    return this.GameService.deleteGame({ id: Number(id) });
  }
}