import dotenv from "dotenv";
dotenv.config();

import { prisma } from "./server/db";

async function main() {
  console.log(await prisma.unit.count());
}

void main();
