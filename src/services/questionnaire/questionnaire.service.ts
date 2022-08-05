import { Injectable } from '@nestjs/common';
import { Questionnaire, Prisma, Question } from '@prisma/client'
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuestionnaireService {
    constructor(private prismaService: PrismaService, private configService: ConfigService) { }

    async getAggregatedQuestionnaire(userId: number, id:number): Promise<Questionnaire | null> {
        return this.prismaService.questionnaire.findFirst({
            where: { userId, id},
            include: {
                questions: true
            }
        })
    }

    async createQuestionnaire(userId: number): Promise<Questionnaire> {
        return this.prismaService.questionnaire.create({
            data: {
                userId,
            }
        })
    }
}
