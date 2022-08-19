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
import { Questionnaire as QuestionnaireModel } from '@prisma/client';
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
    async createQuestionnaire(@Request() req): Promise<QuestionnaireModel> {
        const userId = req.user.userId;
        return this.questionnaireService.createQuestionnaire(userId);
    }

}
