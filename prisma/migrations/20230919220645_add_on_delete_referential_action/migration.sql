-- DropForeignKey
ALTER TABLE "IngredientQuantity" DROP CONSTRAINT "IngredientQuantity_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientQuantity" DROP CONSTRAINT "IngredientQuantity_metricUnitAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "IngredientQuantity" DROP CONSTRAINT "IngredientQuantity_pantryUserId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientQuantity" DROP CONSTRAINT "IngredientQuantity_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientQuantity" DROP CONSTRAINT "IngredientQuantity_shoppingListUserId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientQuantity" DROP CONSTRAINT "IngredientQuantity_usUnitAbbreviation_fkey";

-- DropForeignKey
ALTER TABLE "RecipeDuration" DROP CONSTRAINT "RecipeDuration_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_kindName_fkey";

-- AddForeignKey
ALTER TABLE "RecipeDuration" ADD CONSTRAINT "RecipeDuration_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_usUnitAbbreviation_fkey" FOREIGN KEY ("usUnitAbbreviation") REFERENCES "Unit"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_metricUnitAbbreviation_fkey" FOREIGN KEY ("metricUnitAbbreviation") REFERENCES "Unit"("abbreviation") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_pantryUserId_fkey" FOREIGN KEY ("pantryUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_shoppingListUserId_fkey" FOREIGN KEY ("shoppingListUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_kindName_fkey" FOREIGN KEY ("kindName") REFERENCES "TagKind"("name") ON DELETE CASCADE ON UPDATE CASCADE;
