import {
    Controller,
    Get,
    Post,
    Body,
    Request,
    Param,
    UseGuards
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire as QuestionnaireModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('questionnaire')
export class QuestionnaireController {
    constructor
        (
            private readonly questionnaireService: QuestionnaireService
        ) { }

    @Get()
    async getQuestionnaireById(@Request() req): Promise<QuestionnaireModel> {
        return this.questionnaireService.getQuestionnaireById(req.Questionnaire.QuestionnaireId);
    }

    @Post()
    async createQuestionnaire(@Request() req): Promise<QuestionnaireModel>{
        const userId = req.user.userId;
        return this.questionnaireService.createQuestionnaire(userId);
    }

}
