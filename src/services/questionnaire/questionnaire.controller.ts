import {
    Controller,
    Get,
    Post,
    Body,
    Request,
    Param,
    UseGuards,
    ParseIntPipe
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { DifficultyLevel, Questionnaire as QuestionnaireModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('questionnaire')
export class QuestionnaireController {
    constructor
        (
            private readonly questionnaireService: QuestionnaireService
        ) { }

    @Get(':questionnaireId')
    async getQuestionnaireById(@Param("questionnaireId",new ParseIntPipe()) questionnaireId): Promise<QuestionnaireModel> {
        return this.questionnaireService.getAggregatedQuestionnaire(questionnaireId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createQuestionnaire(@Request() req, @Body() payload: { difficultyLevel: DifficultyLevel, timeout: number }): Promise<QuestionnaireModel> {
        const userId = req.user.userId;
        const difficultyLevel = payload.difficultyLevel;
        const timeout = payload.timeout;
        const createQuestionnairePayload = {
            userId, difficultyLevel, timeout
        }
        return this.questionnaireService.createQuestionnaire(createQuestionnairePayload);
    }

}
