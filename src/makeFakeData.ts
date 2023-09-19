import dotenv from "dotenv";
dotenv.config();

import type { UnitSystem } from "@prisma/client";
import { prisma } from "./server/db";

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

async function main() {
  await makeUnits();
}

void main();
