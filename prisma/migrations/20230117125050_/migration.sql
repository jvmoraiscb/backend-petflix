/*
  Warnings:

  - You are about to drop the column `UsersId` on the `PrismaMovie` table. All the data in the column will be lost.
  - You are about to drop the column `evaluationsId` on the `PrismaMovie` table. All the data in the column will be lost.
  - You are about to drop the column `evaluationsId` on the `PrismaUser` table. All the data in the column will be lost.
  - You are about to drop the column `moviesId` on the `PrismaUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PrismaEvaluation" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "movieId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PrismaMovie" DROP COLUMN "UsersId",
DROP COLUMN "evaluationsId";

-- AlterTable
ALTER TABLE "PrismaUser" DROP COLUMN "evaluationsId",
DROP COLUMN "moviesId";

-- CreateTable
CREATE TABLE "_PrismaMovieToPrismaUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PrismaMovieToPrismaUser_AB_unique" ON "_PrismaMovieToPrismaUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PrismaMovieToPrismaUser_B_index" ON "_PrismaMovieToPrismaUser"("B");

-- AddForeignKey
ALTER TABLE "PrismaEvaluation" ADD CONSTRAINT "PrismaEvaluation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PrismaUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrismaEvaluation" ADD CONSTRAINT "PrismaEvaluation_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "PrismaMovie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrismaMovieToPrismaUser" ADD CONSTRAINT "_PrismaMovieToPrismaUser_A_fkey" FOREIGN KEY ("A") REFERENCES "PrismaMovie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PrismaMovieToPrismaUser" ADD CONSTRAINT "_PrismaMovieToPrismaUser_B_fkey" FOREIGN KEY ("B") REFERENCES "PrismaUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
