/*
  Warnings:

  - Made the column `category` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "featureImage" DROP NOT NULL,
ALTER COLUMN "category" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("title") ON DELETE RESTRICT ON UPDATE CASCADE;
