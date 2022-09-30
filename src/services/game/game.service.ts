import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Game, Prisma, Question, Questionnaire } from '@prisma/client';

@Injectable()
export class GameService {
    constructor(private prismaService: PrismaService) { }


    async createGame(payload: Prisma.GameCreateInput): Promise<Game> {
        return this.prismaService.game.create({
            data: payload
        });
    }

    async getGameById(id: number): Promise<Game | null> {
        return this.prismaService.game.findUnique({
            where: { id },
        });
    }

    async getQuestionById(id: number): Promise<Question | null> {
        return this.prismaService.question.findUnique({
            where: { id },
        });
    }

    async getQuestionnaireById(id: number): Promise<Questionnaire | null> {
        return this.prismaService.questionnaire.findUnique({
            where: { id },
        });
    }

    async getAnswerByIndex(questionId: number, answerIndex: number): Promise<any> {
        const question = await this.getQuestionById(questionId);

        if (answerIndex === question.correctAnswer) {
            console.log('you are awesome!', questionId);

        } else {
            console.log('nope.', answerIndex);
        }
    }



    // async updateCorrectAnswersCount(id: number, correctAnswersCount: number): Promise<Game> {
    //     return this.prismaService.game.update({
    //         where: { id },
    //         data: {
    //             correctUserAnswersCount: correctAnswersCount
    //         }
    //     })
    // }

}