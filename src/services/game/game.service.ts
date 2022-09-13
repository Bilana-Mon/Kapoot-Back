import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from '../question/question.service';
import { Game, Prisma, Question } from '@prisma/client';

@Injectable()
export class GameService {
    constructor(private prismaService: PrismaService, questionService: QuestionService) { }

    // async createGame(data: Prisma.GameCreateInput): Promise<Game> {
    //     const { players, correctUserAnswersCount = 0, finished } = data;
    //     return this.prismaService.game.create({
    //         data: {
    //             players,
    //             correctUserAnswersCount,
    //             finished
    //         }
    //     })
    // }

    // async getGameById(id: number): Promise<Game | null> {
    //     return this.prismaService.game.findUnique({
    //         where: { id },
    //     });
    // }

    async getQuestionById(id: number): Promise<Question | null> {
        return this.prismaService.question.findUnique({
            where: { id },
        });
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