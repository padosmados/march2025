/*
  Warnings:

  - You are about to drop the column `profileId` on the `Property` table. All the data in the column will be lost.
  - The `amenities` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hostlandlinephone]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hostmobilephone]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hostemail]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_profileId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "profileId",
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL,
DROP COLUMN "amenities",
ADD COLUMN     "amenities" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Property_hostlandlinephone_key" ON "Property"("hostlandlinephone");

-- CreateIndex
CREATE UNIQUE INDEX "Property_hostmobilephone_key" ON "Property"("hostmobilephone");

-- CreateIndex
CREATE UNIQUE INDEX "Property_hostemail_key" ON "Property"("hostemail");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
