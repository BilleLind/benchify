/*
  Warnings:

  - The primary key for the `Category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `titel` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `titel` on the `Product` table. All the data in the column will be lost.
  - The primary key for the `Tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `titel` on the `Tags` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_category_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToTags" DROP CONSTRAINT "_ProductToTags_B_fkey";

-- DropIndex
DROP INDEX "Category_titel_key";

-- DropIndex
DROP INDEX "Tags_titel_key";

-- AlterTable
ALTER TABLE "Category" DROP CONSTRAINT "Category_pkey",
DROP COLUMN "titel",
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "Category_pkey" PRIMARY KEY ("title");

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "titel",
ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Tags" DROP CONSTRAINT "Tags_pkey",
DROP COLUMN "titel",
ADD COLUMN     "title" VARCHAR(255) NOT NULL,
ADD CONSTRAINT "Tags_pkey" PRIMARY KEY ("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_title_key" ON "Tags"("title");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("title") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToTags" ADD CONSTRAINT "_ProductToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("title") ON DELETE CASCADE ON UPDATE CASCADE;
