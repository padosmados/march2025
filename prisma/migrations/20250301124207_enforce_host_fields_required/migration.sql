/*
  Warnings:

  - Made the column `hostemail` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hostlandlinephone` on table `Property` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hostmobilephone` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "hostemail" SET NOT NULL,
ALTER COLUMN "hostlandlinephone" SET NOT NULL,
ALTER COLUMN "hostmobilephone" SET NOT NULL;
