import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import type { UnitSystem } from "@prisma/client";
import { prisma } from "./server/db";

function uniqueWords(
  count: number,
  wordOptions = { min: 1, max: 3 },
): string[] {
  const set = new Set<string>();
  while (set.size < count) {
    const words = faker.lorem.words(wordOptions);
    if (words.length < 2) continue;

    set.add(words);
  }

  return [...set];
}

function randomInt(min = 1, max = 100): number {
  return faker.number.int({ min, max });
}

async function makeUnits() {
  await prisma.unit.deleteMany();

  const units = [
    ["tsp", "teaspoon", "US"],
    ["tbsp", "tablespoon", "US"],
    ["fl oz", "fluid ounce", "US"],
    ["c", "cup", "US"],
    ["pt", "pint", "US"],
    ["qt", "quart", "US"],
    ["gal", "gallon", "US"],
    ["oz", "ounce", "US"],
    ["lb", "pound", "US"],
    ["L", "litre", "METRIC"],
    ["mL", "millilitre", "METRIC"],
    ["g", "gram", "METRIC"],
    ["kg", "kilograms", "METRIC"],
  ] satisfies [string, string, UnitSystem][];

  for (const [abbreviation, name, system] of units) {
    const count = await prisma.unit.count({ where: { abbreviation } });
    if (count !== 0) continue;

    await prisma.unit.create({
      data: {
        abbreviation,
        name,
        system,
      },
    });
  }

  return units.map(([abbreviation, _, system]) => ({ system, abbreviation }));
}

async function makeTags() {
  await prisma.tag.deleteMany();
  await prisma.tagKind.deleteMany();

  const tagKinds = uniqueWords(randomInt(5, 15));
  await prisma.tagKind.createMany({
    data: tagKinds.map((name) => ({ name })),
  });

  const tagData = uniqueWords(randomInt(25, 50));
  await prisma.tag.createMany({
    data: tagData.map((name) => ({
      kindName: faker.helpers.arrayElement(tagKinds),
      name,
    })),
  });

  const created = await prisma.tag.findMany({ select: { id: true } });
  return created.map((tag) => ({
    id: tag.id,
  }));
}

type GetRandom = (type?: string) => string;
type GetRandomIds = () => { id: string }[];

async function makeIngredients(getRandomTags: GetRandomIds) {
  await prisma.ingredient.deleteMany();

  const ingredients = uniqueWords(randomInt(100, 200));
  for (const name of ingredients) {
    await prisma.ingredient.create({
      data: {
        name,
        tags: { connect: getRandomTags() },
        icon: faker.image.urlLoremFlickr({
          width: 64,
          height: 64,
          category: "food",
        }),
      },
    });
  }

  const created = await prisma.ingredient.findMany({ select: { id: true } });
  return created.map((ingredient) => ingredient.id);
}
async function makeQuantities(
  getRandomUnit: GetRandom,
  getRandomIngredient: GetRandom,
) {
  await prisma.ingredientQuantity.deleteMany();

  const numQuantities = randomInt(100, 500);
  const quantityData = [];
  for (let i = 0; i < numQuantities; i++) {
    quantityData.push({
      ingredientId: getRandomIngredient(),
      usQuantity: randomInt(),
      usUnitAbbreviation: getRandomUnit("US"),
      metricQuantity: faker.number.float({ min: 1, max: 10, precision: 0.01 }),
      metricUnitAbbreviation: getRandomUnit("METRIC"),
    });
  }

  await prisma.ingredientQuantity.createMany({
    data: quantityData,
  });

  return await prisma.ingredientQuantity.findMany({
    select: { id: true },
  });
}

async function makeRecipes(
  getRandomTags: GetRandomIds,
  getRandomQuantities: GetRandomIds,
) {
  await prisma.recipe.deleteMany();

  const recipes = uniqueWords(randomInt(100, 300), { min: 1, max: 5 });
  for (const name of recipes) {
    await prisma.recipe.create({
      data: {
        name,
        description: faker.lorem.paragraphs(randomInt(1, 3)),
        source: faker.internet.url() + faker.lorem.slug(),
        difficulty: faker.helpers.arrayElement([
          "EASY",
          "INTERMEDIATE",
          "HARD",
        ]),
        duration: {
          create: {
            hours: randomInt(0, 2),
            minutes: randomInt(0, 59),
          },
        },
        tags: { connect: getRandomTags() },
        icon: faker.image.urlLoremFlickr({
          width: 256,
          height: 256,
          category: "food",
        }),
        ingredients: { connect: getRandomQuantities() },
      },
    });
  }
}

async function main() {
  const units = await makeUnits();
  const getRandomUnit: GetRandom = (kind) =>
    faker.helpers.shuffle(
      kind ? units.filter(({ system }) => system === kind) : units,
    )[0]!.abbreviation;

  const tags = await makeTags();
  const getRandomTags: GetRandomIds = () =>
    faker.helpers.shuffle(tags).slice(0, randomInt(5, 10));

  const ingredients = await makeIngredients(getRandomTags);
  const getRandomIngredient = () => faker.helpers.shuffle(ingredients)[0]!;

  const quantities = await makeQuantities(getRandomUnit, getRandomIngredient);
  const getRandomQuantity = () =>
    faker.helpers.shuffle(quantities).slice(0, randomInt(5, 20));

  await makeRecipes(getRandomTags, getRandomQuantity);
}

void main();
