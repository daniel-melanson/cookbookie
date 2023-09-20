/*
  Warnings:

  - The primary key for the `RecipeDuration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[recipeId]` on the table `RecipeDuration` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `RecipeDuration` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "RecipeDuration" DROP CONSTRAINT "RecipeDuration_pkey",
ADD COLUMN     "id" VARCHAR(32) NOT NULL,
ADD CONSTRAINT "RecipeDuration_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeDuration_recipeId_key" ON "RecipeDuration"("recipeId");
