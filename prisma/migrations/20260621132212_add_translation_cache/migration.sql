-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_hash_key" ON "Translation"("hash");

-- CreateIndex
CREATE INDEX "Translation_locale_idx" ON "Translation"("locale");
