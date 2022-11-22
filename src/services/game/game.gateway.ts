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
import { Question, Questionnaire } from "@prisma/client";
import { QuestionnaireService } from "../questionnaire/questionnaire.service";


@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private usersContext: Map<string, {
        userId?: number;
        currentQuestionIndex: number;
        correctAnswersCount: number;
        questionnaire: Questionnaire & {
            questions: Question[];
        }
    }>
    constructor(private readonly gameService: GameService, private readonly questionnaireService: QuestionnaireService) {
        this.usersContext = new Map();
    }

    @WebSocketServer()
    server: Server;

    handleConnection(@ConnectedSocket() client: Socket) {
    }

    handleDisconnect(@ConnectedSocket() client: Socket) {
        //TODO: save in db somehow?
        this.usersContext.delete(client.id);
    }

    getCurrentQuestionOfUser(clientId: string): Question {
        const { questionnaire, currentQuestionIndex } = this.usersContext.get(clientId);
        return questionnaire.questions[currentQuestionIndex];
    }

    @SubscribeMessage('initQuestionnaire')
    async setQuestionnaireId(@ConnectedSocket() client: Socket, @MessageBody() payload: { questionnaireId: number, userId?: number }) {
        const questionnaire = await this.questionnaireService.getAggregatedQuestionnaire(payload.questionnaireId);
        this.usersContext.set(client.id, {
            userId: payload.userId,
            currentQuestionIndex: 0,
            correctAnswersCount: 0,
            questionnaire
        })
        client.emit('showQuestionEvent', this.getCurrentQuestionOfUser(client.id));
    }

    calcContextAfterAnswer(clientId: string, answerIndex: number) {
        const currentQuestion = this.getCurrentQuestionOfUser(clientId);
        const newUserContext = this.usersContext.get(clientId);
        if (currentQuestion.correctAnswer === answerIndex) {
            newUserContext.correctAnswersCount = newUserContext.correctAnswersCount + 1;
        }
        newUserContext.currentQuestionIndex = newUserContext.currentQuestionIndex + 1;
        return newUserContext;
    }

    calcFinalScore(correctAnswers: number, numberOfAnswers: number) {
        const score = Math.trunc(correctAnswers * 100 / numberOfAnswers);
        return score;
    }

    @SubscribeMessage('getAnswerIndex')
    async getAnswerIndex(@ConnectedSocket() client: Socket, @MessageBody() payload: { answerIndex: number }) {
        const newUserContext = this.calcContextAfterAnswer(client.id, payload.answerIndex);
        this.usersContext.set(client.id, newUserContext);

        if (newUserContext.currentQuestionIndex === newUserContext.questionnaire.questions.length) {
            const numberOfQuestions = newUserContext.questionnaire.questions.length;
            const correctAnswers = newUserContext.correctAnswersCount
            const score = this.calcFinalScore(correctAnswers, numberOfQuestions);
            const victoryThreshold = 70;
            client.emit('showGameConclusion', {
                numberOfQuestions,
                correctAnswers,
                score,
            })
            if (score >= victoryThreshold) {
                client.emit('showGameVictory', console.log('victory'))
            } else {
                client.emit('showGameLose', console.log('lose'))
            }
        }

        else {
            client.emit('showQuestionEvent', this.getCurrentQuestionOfUser(client.id));
        }
    }

}