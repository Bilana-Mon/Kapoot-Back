/*
  Warnings:

  - You are about to drop the column `themeId` on the `Questionnaire` table. All the data in the column will be lost.
  - You are about to drop the `Answer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_questionnaireId_fkey";

-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_quetionId_fkey";

-- DropForeignKey
ALTER TABLE "Questionnaire" DROP CONSTRAINT "Questionnaire_themeId_fkey";

-- DropForeignKey
ALTER TABLE "Theme" DROP CONSTRAINT "Theme_gameId_fkey";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answers" TEXT[];

-- AlterTable
ALTER TABLE "Questionnaire" DROP COLUMN "themeId";

-- DropTable
DROP TABLE "Answer";

-- DropTable
DROP TABLE "Theme";
