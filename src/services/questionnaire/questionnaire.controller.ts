import {
    Controller,
    Get,
    Request,
} from '@nestjs/common';
import { QuestionnaireService } from './questionnaire.service';
import { Questionnaire as QuestionnaireModel } from '@prisma/client';


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

}
