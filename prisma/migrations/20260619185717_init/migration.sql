-- CreateTable
CREATE TABLE "DiscoEvent" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "day" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dj" TEXT,
    "time" TEXT NOT NULL,
    "special" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiscoEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DiscoEvent_date_idx" ON "DiscoEvent"("date");
