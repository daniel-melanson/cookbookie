/*
  Warnings:

  - You are about to alter the column `icon` on the `Ingredient` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1024)`.
  - You are about to alter the column `icon` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1024)`.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "icon" SET DATA TYPE VARCHAR(1024);

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "icon" SET DATA TYPE VARCHAR(1024);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
ADD COLUMN     "avatar" VARCHAR(1024);
