-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "UnitSystem" AS ENUM ('US', 'METRIC');

-- CreateEnum
CREATE TYPE "RecipeDifficulty" AS ENUM ('EASY', 'INTERMEDIATE', 'HARD');

-- CreateTable
CREATE TABLE "Account" (
    "id" VARCHAR(32) NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" VARCHAR(32) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" VARCHAR(64) NOT NULL,
    "lastName" VARCHAR(64) NOT NULL,
    "email" VARCHAR(512) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "image" VARCHAR(1024) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "emailVerified" TIMESTAMP(3),
    "unitSystem" "UnitSystem" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
    "abbreviation" VARCHAR(8) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "system" "UnitSystem" NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("abbreviation")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(128) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeDuration" (
    "recipeId" TEXT NOT NULL,
    "hours" SMALLINT NOT NULL,
    "minutes" SMALLINT NOT NULL,

    CONSTRAINT "RecipeDuration_pkey" PRIMARY KEY ("recipeId")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" VARCHAR(32) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "description" VARCHAR(512) NOT NULL,
    "source" VARCHAR(1024) NOT NULL,
    "difficulty" "RecipeDifficulty" NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientQuantity" (
    "id" VARCHAR(32) NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "usQuantity" DECIMAL(10,2) NOT NULL,
    "usUnitAbbreviation" TEXT NOT NULL,
    "mentricQuantity" DECIMAL(10,2) NOT NULL,
    "mentricUnitAbbreviation" TEXT NOT NULL,
    "recipeId" TEXT,
    "pantryUserId" TEXT,
    "shoppingListUserId" TEXT,

    CONSTRAINT "IngredientQuantity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagKind" (
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "TagKind_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" VARCHAR(32) NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "kindName" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_IngredientToTag" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipeToTag" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipeToUser" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateTable
CREATE TABLE "_UserAllergens" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateTable
CREATE TABLE "_UserDietaryPreferences" (
    "A" VARCHAR(32) NOT NULL,
    "B" VARCHAR(32) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Unit_name_key" ON "Unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_source_key" ON "Recipe"("source");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientQuantity_ingredientId_recipeId_pantryUserId_shopp_key" ON "IngredientQuantity"("ingredientId", "recipeId", "pantryUserId", "shoppingListUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_kindName_name_key" ON "Tag"("kindName", "name");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToTag_AB_unique" ON "_IngredientToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToTag_B_index" ON "_IngredientToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToTag_AB_unique" ON "_RecipeToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToTag_B_index" ON "_RecipeToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToUser_AB_unique" ON "_RecipeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToUser_B_index" ON "_RecipeToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserAllergens_AB_unique" ON "_UserAllergens"("A", "B");

-- CreateIndex
CREATE INDEX "_UserAllergens_B_index" ON "_UserAllergens"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserDietaryPreferences_AB_unique" ON "_UserDietaryPreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_UserDietaryPreferences_B_index" ON "_UserDietaryPreferences"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeDuration" ADD CONSTRAINT "RecipeDuration_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_usUnitAbbreviation_fkey" FOREIGN KEY ("usUnitAbbreviation") REFERENCES "Unit"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_mentricUnitAbbreviation_fkey" FOREIGN KEY ("mentricUnitAbbreviation") REFERENCES "Unit"("abbreviation") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_pantryUserId_fkey" FOREIGN KEY ("pantryUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientQuantity" ADD CONSTRAINT "IngredientQuantity_shoppingListUserId_fkey" FOREIGN KEY ("shoppingListUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_kindName_fkey" FOREIGN KEY ("kindName") REFERENCES "TagKind"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToTag" ADD CONSTRAINT "_IngredientToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToTag" ADD CONSTRAINT "_IngredientToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTag" ADD CONSTRAINT "_RecipeToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTag" ADD CONSTRAINT "_RecipeToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUser" ADD CONSTRAINT "_RecipeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUser" ADD CONSTRAINT "_RecipeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAllergens" ADD CONSTRAINT "_UserAllergens_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserAllergens" ADD CONSTRAINT "_UserAllergens_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDietaryPreferences" ADD CONSTRAINT "_UserDietaryPreferences_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserDietaryPreferences" ADD CONSTRAINT "_UserDietaryPreferences_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
