/*
  Warnings:

  - Added the required column `actors` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `director` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `writer` to the `PrismaMovie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrismaMovie" ADD COLUMN     "actors" TEXT NOT NULL,
ADD COLUMN     "director" TEXT NOT NULL,
ADD COLUMN     "runtime" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "writer" TEXT NOT NULL,
ALTER COLUMN "year" SET DATA TYPE TEXT;
