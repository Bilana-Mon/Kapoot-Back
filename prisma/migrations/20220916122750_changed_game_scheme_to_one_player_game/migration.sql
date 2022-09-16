/*
  Warnings:

  - You are about to drop the column `adminId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `players` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_adminId_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "adminId",
DROP COLUMN "players",
ADD COLUMN     "userId" INTEGER,
ADD COLUMN     "victory" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isAdmin";

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
