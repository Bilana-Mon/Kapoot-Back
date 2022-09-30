/*
  Warnings:

  - You are about to drop the column `difficultyLevel` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Questionnaire` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Questionnaire" DROP CONSTRAINT "Questionnaire_userId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "difficultyLevel";

-- AlterTable
ALTER TABLE "Questionnaire" DROP COLUMN "userId";
