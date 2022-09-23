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

    async setGameLevel(questionnaireId: number, gameId: number): Promise<Game> {
        const questionnaire = await this.getQuestionnaireById(questionnaireId);

        if (questionnaire.id === 10) {
            return this.prismaService.game.update({
                where: {
                    id: gameId
                },
                data: {
                    difficultyLevel: "Easy"
                }
            });
        } else if (questionnaire.id === 11) {
            return this.prismaService.game.update({
                where: {
                    id: gameId
                },
                data: {
                    difficultyLevel: "Hard"
                }
            });
        } else {
            return this.prismaService.game.update({
                where: {
                    id: gameId
                },
                data: {
                    difficultyLevel: "Extreme"
                }
            });
        };
    }

    async getAnswerByIndex(questionId: number, answerIndex: number): Promise<any> {
        let correctAnswersCount = 0;
        console.log(correctAnswersCount);

        const question = await this.getQuestionById(questionId);

        if (answerIndex === question.correctAnswer) {
            correctAnswersCount++
            console.log('you are awesome!', questionId);
            console.log(correctAnswersCount);

        } else {
            console.log('nope.', answerIndex);
            console.log(correctAnswersCount);
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