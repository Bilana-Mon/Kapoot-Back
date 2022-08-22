/*
  Warnings:

  - A unique constraint covering the columns `[correctAnswer]` on the table `Question` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `correctAnswer` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "correctAnswer" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Question_answers_unique_constraint" ON "Question"("correctAnswer");
