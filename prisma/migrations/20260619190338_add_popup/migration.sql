-- CreateTable
CREATE TABLE "PopupSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL DEFAULT '',
    "body" TEXT NOT NULL DEFAULT '',
    "imageUrl" TEXT,
    "ctaLabel" TEXT,
    "ctaUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PopupSettings_pkey" PRIMARY KEY ("id")
);
