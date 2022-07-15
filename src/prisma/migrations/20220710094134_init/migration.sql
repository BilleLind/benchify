-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "titel" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "categoryTitel" TEXT,
    "featureImage" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "titel" VARCHAR(255) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("titel")
);

-- CreateTable
CREATE TABLE "Tags" (
    "titel" VARCHAR(255) NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("titel")
);

-- CreateTable
CREATE TABLE "_ProductToTags" (
    "A" INTEGER NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_titel_key" ON "Category"("titel");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_titel_key" ON "Tags"("titel");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToTags_AB_unique" ON "_ProductToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToTags_B_index" ON "_ProductToTags"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryTitel_fkey" FOREIGN KEY ("categoryTitel") REFERENCES "Category"("titel") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTags" ADD CONSTRAINT "_ProductToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTags" ADD CONSTRAINT "_ProductToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("titel") ON DELETE CASCADE ON UPDATE CASCADE;
