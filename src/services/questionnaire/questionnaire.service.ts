import { Injectable } from '@nestjs/common';
import { Questionnaire, Prisma, Question, DifficultyLevel } from '@prisma/client'
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuestionnaireService {
    constructor(private prismaService: PrismaService, private configService: ConfigService) { }

    async getAggregatedQuestionnaire(questionnaireId:number): Promise<Questionnaire & {
        questions: Question[];
    }> {
        const aggregatedQuestionnaire = await this.prismaService.questionnaire.findFirst({
            where: { id: questionnaireId },
            include: {
                questions: true
            }
        })
        return aggregatedQuestionnaire;
    }

    async createQuestionnaire(createQuestionnairePayload: { userId: number, difficultyLevel: DifficultyLevel, timeout: number }): Promise<Questionnaire> {
        return this.prismaService.questionnaire.create({
            data: {
                ...createQuestionnairePayload
            }
        })
    }
}
