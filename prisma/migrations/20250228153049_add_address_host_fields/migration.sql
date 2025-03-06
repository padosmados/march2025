/*
  Warnings:

  - Added the required column `address` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `host` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "host" TEXT NOT NULL;
