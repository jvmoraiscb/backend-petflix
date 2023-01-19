-- CreateTable
CREATE TABLE "PrismaUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePic" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrismaUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrismaMovie" (
    "id" TEXT NOT NULL,
    "imdbId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "runtime" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "plot" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "writer" TEXT NOT NULL,
    "actors" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrismaMovie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrismaEvaluation" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT,
    "movieId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrismaEvaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PrismaMovieToPrismaUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PrismaUser_email_key" ON "PrismaUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PrismaMovie_imdbId_key" ON "PrismaMovie"("imdbId");

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
