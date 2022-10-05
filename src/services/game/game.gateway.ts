import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from "@nestjs/websockets";
import { GameService } from "./game.service";
import { Server, Socket } from "socket.io";


@WebSocketGateway({ cors: { origin: "*" } })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private usersContext: Map<string, {
        correctAnswersCount: number
    }>
    constructor(private readonly gameService: GameService) {
        this.usersContext = new Map();
    }

    @WebSocketServer()
    server: Server;

    handleConnection(@ConnectedSocket() client: Socket) {
        this.usersContext.set(client.id, {
            correctAnswersCount: 0
        })
        console.log(this.usersContext);
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        //TODO: save in db somehow?
        this.usersContext.delete(client.id);
    }

    @SubscribeMessage('getQuestion')
    async getQuestion(@ConnectedSocket() client: Socket, @MessageBody() payload) {

        const answer = await this.gameService.getQuestionById(payload.questionId);
        console.log('isnt this exciting?', payload.questionId);

        return { event: 'getQuestion', data: answer };
    }

    @SubscribeMessage('getAnswerIndex')
    async getAnswerIndex(@ConnectedSocket() client: Socket, @MessageBody() { questionId, answerIndex }) {
        const question = await this.gameService.getQuestionById(questionId);
        const answer = await this.gameService.getAnswerByIndex(questionId, answerIndex);
        if (answerIndex === question.correctAnswer) {
            const { correctAnswersCount } = this.usersContext.get(client.id);
            this.usersContext.set(client.id, { correctAnswersCount: correctAnswersCount + 1 });
            console.log(correctAnswersCount);
        }
        return { event: 'getAnswerIndex', data: answer };
    }

    @SubscribeMessage('setGameVictory')
    async setGameVictory(@ConnectedSocket() client: Socket) {
        const { correctAnswersCount } = this.usersContext.get(client.id);
        const answer = await this.gameService.setGameVictory(correctAnswersCount);
        return { event: 'setGameVictory', data: answer };
    }

}