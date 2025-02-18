-- CreateTable
CREATE TABLE "Monster" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "challenge_rating" DOUBLE PRECISION NOT NULL,
    "xpGeneral" INTEGER NOT NULL,
    "xpInLair" INTEGER,
    "environments" TEXT[],
    "source" TEXT NOT NULL,
    "type" TEXT[],

    CONSTRAINT "Monster_pkey" PRIMARY KEY ("id")
);
