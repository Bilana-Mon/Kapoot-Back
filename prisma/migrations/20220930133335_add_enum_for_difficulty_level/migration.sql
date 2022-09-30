/*
  Warnings:

  - Changed the type of `difficultyLevel` on the `Game` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `difficultyLevel` to the `Questionnaire` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'HARD', 'EXTREME');

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "difficultyLevel",
ADD COLUMN     "difficultyLevel" "DifficultyLevel" NOT NULL;

-- AlterTable
ALTER TABLE "Questionnaire" ADD COLUMN     "difficultyLevel" "DifficultyLevel" NOT NULL;
