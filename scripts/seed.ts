import { PrismaClient } from "@prisma/client";
import userData from './seed-data/user';
import questionnaireData from './seed-data/questionnaire';
import questionData from './seed-data/question';

const prisma = new PrismaClient();

const seedUser = async () => {
    await prisma.user.createMany({
        data: userData
    });
}

const seedQuestionnaire = async () => {
    await prisma.questionnaire.createMany({
        data: questionnaireData
    });
}

const seedQuestion = async () => {
    await prisma.question.createMany({
        data: questionData
    });
}

const seed = async () => {
    await seedUser();
    await seedQuestionnaire();
    await seedQuestion();
}

seed();