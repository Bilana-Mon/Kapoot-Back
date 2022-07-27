import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Question, Prisma } from '@prisma/client';


@Injectable()
export class QuestionService {
    constructor(private prismaService: PrismaService) { }

    async getQuestionById(id: number): Promise<Question | null> {
        console.log('lala service');
        
        return this.prismaService.question.findUnique({
            where: { id },
        });
    }

    async createQuestions(): Promise<Prisma.BatchPayload> {
        const questions = await this.prismaService.question.createMany({
            data: [
                { title: "where is the milk?" },
                { title: "where is the dog?" },
                { title: "where is the cat?" },
                { title: "where is the horse?" },
                { title: "where is the donkey?" },
            ]
        })
        return questions
    }
}