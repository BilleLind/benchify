/*
  Warnings:

  - Made the column `featureImage` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "featureImage" SET NOT NULL;