import { Controller, Get, Post, Request,Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Prisma, Question as QuestionModel } from '@prisma/client';

@Controller('question')
export class QuestionController {
    constructor
        (
            private questionService: QuestionService
        ) { }

        @Get()
        async getQuestions(@Request() req): Promise<any>{
            return this.questionService.getQuestions();
        }

    @Get(':id')
    async getQuestionById(@Param('id') questionId): Promise<QuestionModel> {
        console.log('lala get');
        return this.questionService.getQuestionById(parseInt(questionId));
    }

    @Post()
    async createQuestions(): Promise<Prisma.BatchPayload> {
        console.log('lala post');

        return this.questionService.createQuestions();
    }
}
