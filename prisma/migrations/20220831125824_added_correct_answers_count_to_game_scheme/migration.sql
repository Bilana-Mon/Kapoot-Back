/*
  Warnings:

  - Added the required column `correctUserAnswersCount` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Question_answers_unique_constraint";

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "correctUserAnswersCount" INTEGER NOT NULL,
ALTER COLUMN "started" SET DEFAULT CURRENT_TIMESTAMP;
