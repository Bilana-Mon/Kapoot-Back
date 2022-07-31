import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Answer, Prisma } from '@prisma/client';

@Injectable()
export class AnswerService {
    constructor(private prismaService: PrismaService) { }

    async getAnswerById(id: number): Promise<Answer | null> {
        return this.prismaService.answer.findUnique({
            where: { id },
        });
    }



    // async createAnswers(): Promise<Prisma.BatchPayload> {
    //     const answers = await this.prismaService.answer.createMany({
    //         data:
    //         [
    //             [{ title: "In the fridge" }, { title: "On the table" }, { title: "Outside the door" }, { title: "There is no milk" }],
    //             [{ title: "In the backyard" }, { title: "In the park" }, { title: "It run away" }, { title: "We don't have a dog" }],
    //             [{ title: "In the backyard" }, { title: "In the park" }, { title: "It run away" }, { title: "We don't have a cat" }],
    //             [{ title: "In the backyard" }, { title: "In the park" }, { title: "It run away" }, { title: "We don't have a horse" }],
    //             [{ title: "In the backyard" }, { title: "In the park" }, { title: "It run away" }, { title: "We don't have a donkey" }],
    //         ]

    //     });
    //     return answers;
    // }
}