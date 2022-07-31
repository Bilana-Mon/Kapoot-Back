import { Controller, Get, Post, Request, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Prisma, Answer as AnswerModel } from '@prisma/client';

@Controller('answer')
export class AnswerController {
    constructor
        (
            private answerService: AnswerService
        ) { }

    @Get(':id')
    async getAnswerById(@Param('id') answerId): Promise<AnswerModel> {
        console.log('lala get');
        return this.answerService.getAnswerById(parseInt(answerId));
    }

    // @Post()
    // async createAnswers(): Promise<Prisma.BatchPayload> {
    //     console.log('lala post');
    //     return this.answerService.createAnswers();
    // }

}
