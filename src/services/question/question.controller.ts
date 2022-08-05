import { Controller, Get, Post, Request, Param, Body, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Prisma, Question as QuestionModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('question')
export class QuestionController {
    constructor
        (
            private questionService: QuestionService
        ) { }

    @Get()
    async getQuestions(@Request() req): Promise<any> {
        return this.questionService.getQuestions();
    }

    @Get(':id')
    async getQuestionById(@Param('id') questionId): Promise<QuestionModel> {
        console.log('lala get');
        return this.questionService.getQuestionById(parseInt(questionId));
    }

    @Post()
    async insertQuestionToQuestionnaire(@Body() payload: Prisma.QuestionCreateInput): Promise<QuestionModel> {
        return this.questionService.createQuestion(payload);
    }
}
