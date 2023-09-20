/*
  Warnings:

  - Added the required column `recipeDurationId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "recipeDurationId" VARCHAR(32) NOT NULL;

-- AlterTable
ALTER TABLE "RecipeDuration" ALTER COLUMN "recipeId" DROP NOT NULL;
