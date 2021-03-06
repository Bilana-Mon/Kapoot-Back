import { Injectable } from '@nestjs/common';
import {Questionnaire, Prisma} from '@prisma/client'
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuestionnaireService {
    constructor(private prismaService: PrismaService, private configService: ConfigService) { }

    async getQuestionnaireById(id:number):Promise<Questionnaire | null>{
        return this.prismaService.questionnaire.findUnique({
            where:{id},
        })
    }
}
