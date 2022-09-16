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
import { Game as GameModel } from "@prisma/client";

@Controller('game')
export class GameController {
    constructor
        (
            private readonly gameService: GameService
        ) { }

    @Post()
    async createGame(@Body() payload): Promise<GameModel> {
        return this.gameService.createGame(payload);
    }
}
