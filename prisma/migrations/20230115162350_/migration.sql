/*
  Warnings:

  - The primary key for the `PrismaEvaluation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PrismaMovie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idImdb` on the `PrismaMovie` table. All the data in the column will be lost.
  - The primary key for the `PrismaUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[imdbId]` on the table `PrismaMovie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `genre` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imdbId` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plot` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PrismaMovie_idImdb_key";

-- AlterTable
ALTER TABLE "PrismaEvaluation" DROP CONSTRAINT "PrismaEvaluation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "movieId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PrismaEvaluation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PrismaEvaluation_id_seq";

-- AlterTable
ALTER TABLE "PrismaMovie" DROP CONSTRAINT "PrismaMovie_pkey",
DROP COLUMN "idImdb",
ADD COLUMN     "genre" TEXT NOT NULL,
ADD COLUMN     "imdbId" TEXT NOT NULL,
ADD COLUMN     "plot" TEXT NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "evaluationsId" SET DATA TYPE TEXT[],
ALTER COLUMN "UsersId" SET DATA TYPE TEXT[],
ADD CONSTRAINT "PrismaMovie_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PrismaMovie_id_seq";

-- AlterTable
ALTER TABLE "PrismaUser" DROP CONSTRAINT "PrismaUser_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "moviesId" SET DATA TYPE TEXT[],
ALTER COLUMN "evaluationsId" SET DATA TYPE TEXT[],
ADD CONSTRAINT "PrismaUser_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "PrismaUser_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "PrismaMovie_imdbId_key" ON "PrismaMovie"("imdbId");
