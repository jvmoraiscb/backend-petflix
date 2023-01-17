/*
  Warnings:

  - You are about to drop the `Evaluation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MovieToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_userId_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToUser" DROP CONSTRAINT "_MovieToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MovieToUser" DROP CONSTRAINT "_MovieToUser_B_fkey";

-- DropTable
DROP TABLE "Evaluation";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_MovieToUser";

-- CreateTable
CREATE TABLE "PrismaUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "moviesId" INTEGER[],
    "evaluationsId" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrismaUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrismaMovie" (
    "id" SERIAL NOT NULL,
    "idImdb" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "evaluationsId" INTEGER[],
    "UsersId" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrismaMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrismaEvaluation" (
    "id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrismaEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrismaUser_email_key" ON "PrismaUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PrismaMovie_idImdb_key" ON "PrismaMovie"("idImdb");
