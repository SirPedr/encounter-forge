/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "challenge_rating" DOUBLE PRECISION NOT NULL,
    "xp" INTEGER NOT NULL,
    "terrains" TEXT[],
    "source" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);
