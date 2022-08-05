/*
  Warnings:

  - Added the required column `userId` to the `Questionnaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questionnaire" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Questionnaire" ADD CONSTRAINT "Questionnaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
