import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Question, Prisma } from '@prisma/client';

@Injectable()
export class QuestionService {
    constructor(private prisma: PrismaService) { }

    async Question(
        questionWhereUniqueInput: Prisma.QuestionWhereUniqueInput,
    ): Promise<Question | null> {
        return this.prisma.question.findUnique({
            where: questionWhereUniqueInput,
        });
    }

    async Questions(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.QuestionWhereUniqueInput;
        where?: Prisma.QuestionWhereInput;
        orderBy?: Prisma.QuestionOrderByWithRelationInput;
    }): Promise<Question[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.question.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createQuestion(data: Prisma.QuestionCreateInput): Promise<Question> {
        return this.prisma.question.create({
            data,
        });
    }

    async updateQuestion(params: {
        where: Prisma.QuestionWhereUniqueInput;
        data: Prisma.QuestionUpdateInput;
    }): Promise<Question> {
        const { where, data } = params;
        return this.prisma.question.update({
            data,
            where,
        });
    }

    async deleteQuestion(where: Prisma.QuestionWhereUniqueInput): Promise<Question> {
        return this.prisma.question.delete({
            where,
        });
    }
}