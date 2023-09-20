/*
  Warnings:

  - Made the column `recipeId` on table `RecipeDuration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RecipeDuration" ALTER COLUMN "recipeId" SET NOT NULL;
