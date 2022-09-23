import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resetDB = async () => {
    await prisma.question.deleteMany({});
    await prisma.questionnaire.deleteMany({});
    await prisma.user.deleteMany({});
}

resetDB();