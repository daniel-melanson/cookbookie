import dotenv from "dotenv";
dotenv.config();

import { faker } from "@faker-js/faker";
import type { UnitSystem } from "@prisma/client";
import { prisma } from "./server/db";

function uniqueWords(count: number): string[] {
  const set = new Set<string>();
  for (let i = 0; i < count; i++) {
    set.add(faker.lorem.words({ min: 1, max: 3 }));
  }

  return [...set];
}

async function makeUnits() {
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
}

async function makeTags() {
  const tagCount = await prisma.tag.count();
  if (tagCount !== 0) return;

  const tagKinds = uniqueWords(faker.number.int({ min: 5, max: 15 }));
  await prisma.tagKind.createMany({
    data: tagKinds.map((name) => ({ name })),
  });

  const tags = uniqueWords(faker.number.int({ min: 30, max: 70 }));
  await prisma.tag.createMany({
    data: tags.map((name) => ({
      kindName: faker.helpers.arrayElement(tagKinds),
      name,
    })),
  });
}

async function main() {
  await makeUnits();
  await makeTags();
}

void main();
