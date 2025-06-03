/*
  Warnings:

  - You are about to drop the column `adress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `eco_score` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `jadis_wallet` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_date` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pseudo]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pseudo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "adress",
DROP COLUMN "eco_score",
DROP COLUMN "jadis_wallet",
DROP COLUMN "subscription_date",
ADD COLUMN     "acceptedPrivacyPolicy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pseudo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
