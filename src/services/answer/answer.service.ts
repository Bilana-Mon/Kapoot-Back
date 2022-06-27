import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Answer, Prisma } from '@prisma/client';

@Injectable()
export class AnswerService {
    constructor(private prisma: PrismaService) { }

    async answer(
        answerWhereUniqueInput: Prisma.AnswerWhereUniqueInput,
    ): Promise<Answer | null> {
        return this.prisma.answer.findUnique({
            where: answerWhereUniqueInput,
        });
    }

    async answers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.AnswerWhereUniqueInput;
        where?: Prisma.AnswerWhereInput;
        orderBy?: Prisma.AnswerOrderByWithRelationInput;
    }): Promise<Answer[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.answer.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }

    async createAnswer(data: Prisma.AnswerCreateInput): Promise<Answer> {
        return this.prisma.answer.create({
            data,
        });
    }

    async updateAnswer(params: {
        where: Prisma.AnswerWhereUniqueInput;
        data: Prisma.AnswerUpdateInput;
    }): Promise<Answer> {
        const { where, data } = params;
        return this.prisma.answer.update({
            data,
            where,
        });
    }

    async deleteAnswer(where: Prisma.AnswerWhereUniqueInput): Promise<Answer> {
        return this.prisma.answer.delete({
            where,
        });
    }
}