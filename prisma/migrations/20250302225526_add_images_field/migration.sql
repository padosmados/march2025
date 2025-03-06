/*
  Warnings:

  - You are about to drop the column `image` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "image",
DROP COLUMN "location",
ADD COLUMN     "images" TEXT[];
