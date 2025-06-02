/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `mot_de_passe` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prénom` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sexe` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "adresse" TEXT,
ADD COLUMN     "date_inscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id_user" SERIAL NOT NULL,
ADD COLUMN     "jadis_wallet" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "mot_de_passe" TEXT NOT NULL,
ADD COLUMN     "nom" TEXT NOT NULL,
ADD COLUMN     "prenom" TEXT NOT NULL,
ADD COLUMN     "score_eco" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sexe" TEXT NOT NULL,
ADD COLUMN     "url_photo_profil" TEXT,
ADD COLUMN     "ville" TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id_user");
