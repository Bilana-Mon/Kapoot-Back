import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Question, Prisma } from '@prisma/client';


@Injectable()
export class QuestionService {
    constructor(private prismaService: PrismaService) { }

    async getQuestions(): Promise<any> {
        return this.prismaService.question.findMany({
            where: {}
        })
    }

    async getQuestionById(id: number): Promise<Question | null> {

        return this.prismaService.question.findUnique({
            where: { id },
        });
    }

    async createQuestion(payload: Prisma.QuestionCreateInput): Promise<Question> {
        return this.prismaService.question.create({
            data: payload
        })
    }
}