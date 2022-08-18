import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { GameService } from "./game.service";
import { Server } from "socket.io";


@WebSocketGateway()
export class GameGateway {
    constructor(private readonly gameService: GameService) { }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('getQuestion')
    getQuestion(@MessageBody() questionId) {
        console.log('lala');

        return this.gameService.getQuestionById(parseInt(questionId));
    }
}