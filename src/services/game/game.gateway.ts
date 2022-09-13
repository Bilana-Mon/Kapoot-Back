import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { GameService } from "./game.service";
import { Server } from "socket.io";


@WebSocketGateway({ cors: { origin: "*" } })
export class GameGateway {
    constructor(private readonly gameService: GameService) { }

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('getQuestion')
    async getQuestion(@MessageBody() payload) {
        console.log('lala question');
        const answer = await this.gameService.getQuestionById(payload.questionId);
        console.log('isnt this exciting?', payload.questionId);

        return { event: 'getQuestion', data: answer };
    }

    @SubscribeMessage('getAnswerIndex')
    async getAnswerIndex(@MessageBody() { questionId, answerIndex }) {
        console.log('lala answer');
        const answer = await this.gameService.getAnswerByIndex(questionId, answerIndex);
        console.log('this is me');
        return { event: 'getAnswerIndex', data: answer };
    }
}