import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionService } from '../question/question.service';
import { Game, Prisma, Question } from '@prisma/client';

@Injectable()
export class GameService {
    constructor(private prismaService: PrismaService, questionService: QuestionService) { }


    async getQuestionById(id: number): Promise<Question | null> {
        return this.prismaService.question.findUnique({
            where: { id },
        });
    }

}