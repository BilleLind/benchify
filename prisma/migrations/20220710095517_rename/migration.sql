/*
  Warnings:

  - You are about to drop the column `categoryTitel` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryTitel_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryTitel",
ADD COLUMN     "category" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("titel") ON DELETE SET NULL ON UPDATE CASCADE;
