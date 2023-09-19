/*
  Warnings:

  - You are about to drop the column `mentricQuantity` on the `IngredientQuantity` table. All the data in the column will be lost.
  - You are about to drop the column `mentricUnitAbbreviation` on the `IngredientQuantity` table. All the data in the column will be lost.
  - Added the required column `metricQuantity` to the `IngredientQuantity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metricUnitAbbreviation` to the `IngredientQuantity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IngredientQuantity" DROP CONSTRAINT "IngredientQuantity_mentricUnitAbbreviation_fkey";

-- AlterTable
ALTER TABLE "IngredientQuantity" DROP COLUMN "mentricQuantity",
DROP COLUMN "mentricUnitAbbreviation",
ADD COLUMN     "metricQuantity" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "metricUnitAbbreviation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "icon" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_metricUnitAbbreviation_fkey" FOREIGN KEY ("metricUnitAbbreviation") REFERENCES "Unit"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;
