import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Question, Prisma } from '@prisma/client';


@Injectable()
export class QuestionService {
    constructor(private prismaService: PrismaService) { }

    async getQuestions(): Promise<any>{
        return this.prismaService.question.findMany({
            where:{}
        })
    }

    async getQuestionById(id: number): Promise<Question | null> {
        console.log('lala service');

        return this.prismaService.question.findUnique({
            where: { id },
        });
    }

    async createQuestions(): Promise<Prisma.BatchPayload> {
        const questions = await this.prismaService.question.createMany({
            data: [
                {
                    title: "where is the milk?",
                    answers: ["In the fridge", "On the table", "Outside the door", "There is no milk"]
                },
                {
                    title: "where is the dog?",
                    answers: ["In the backyard", "It run away", "In the park", "We don't have a dog"]
                },
                {
                    title: "where is the cat?",
                    answers: ["In the backyard", "It run away", "In the park", "We don't have a cat"]
                },
                {
                    title: "where is the horse?",
                    answers: ["In the backyard", "It run away", "In the park", "We don't have a horse"]
                },
                {
                    title: "where is the donkey?",
                    answers: ["In the backyard", "It run away", "In the park", "We don't have a donkey"]
                },
            ]
        })
        return questions
    }
}

// [{ title: "In the fridge" }, { title: "On the table" }, { title: "Outside the door" }, { title: "There is no milk" }],
//             [{ title: "In the backyard" }, { title: "In the park" }, { title: "It run away" }, { title: "We don't have a dog" }],
//             [{ title: "In the backyard" }, { title: "In the park" }, { title: "It run away" }, { title: "We don't have a cat" }],
//             [{ title: "In the backyard" }, { title: "In the park" }, { title: "It run away" }, { title: "We don't have a horse" }],
//             [{ title: "In the backyard" }, { title: "In the park" }, { title: "It run away" }, { title: "We don't have a donkey" }],