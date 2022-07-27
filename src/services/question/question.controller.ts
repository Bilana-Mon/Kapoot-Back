import { Controller, Get, Post, Request } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Prisma, Question as QuestionModel } from '@prisma/client';

@Controller('question')
export class QuestionController {
    constructor
        (
            private questionService: QuestionService
        ) { }

    @Get()
    async getQuestionById(@Request() req): Promise<QuestionModel> {
        console.log('lala get');
        return this.questionService.getQuestionById(req.question.id);
    }

    @Post()
    async createQuestions(): Promise<Prisma.BatchPayload> {
        console.log('lala post');
        
        return this.questionService.createQuestions();
    }
}
