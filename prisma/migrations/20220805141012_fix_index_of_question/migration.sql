/*
  Warnings:

  - Made the column `questionnaireId` on table `Question` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_questionnaireId_fkey";

-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "questionnaireId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_questionnaireId_fkey" FOREIGN KEY ("questionnaireId") REFERENCES "Questionnaire"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
