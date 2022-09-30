import { Injectable } from '@nestjs/common';
import { Questionnaire, Prisma, Question, DifficultyLevel } from '@prisma/client'
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuestionnaireService {
    constructor(private prismaService: PrismaService, private configService: ConfigService) { }

    async getAggregatedQuestionnaire(id:number): Promise<Questionnaire | null> {
        return await this.prismaService.questionnaire.findFirst({
            where: { id},
            include: {
                questions: true
            }
        })
    }

    async createQuestionnaire(createQuestionnairePayload: { userId: number, difficultyLevel: DifficultyLevel }): Promise<Questionnaire> {
        return this.prismaService.questionnaire.create({
            data: {
                ...createQuestionnairePayload
            }
        })
    }
}
