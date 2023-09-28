/* eslint-disable */
// @ts-nocheck

import { PrismaClient } from "@prisma/client";

import { env } from "~/env.mjs";
import {
  UserCreateInput,
  IngredientCreateInput,
  RecipeCreateInput,
  TagKindCreateInput,
  TagCreateInput,
} from "~/utils/validators";

const validate = (Model) => ({
  create({ args, query }) {
    args.data = Model.parse(args.data);

    return query(args);
  },
  update({ args, query }) {
    args.data = Model.partial().parse(args.data);

    return query(args);
  },
  updateMany({ args, query }) {
    args.data = Model.partial().parse(args.data);

    return query(args);
  },
  upsert({ args, query }) {
    args.create = Model.parse(args.create);
    args.update = Model.partial().parse(args.update);

    return query(args);
  },
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = (
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })
).$extends({
  query: {
    user: validate(UserCreateInput),
    ingredient: validate(IngredientCreateInput),
    recipe: validate(RecipeCreateInput),
    tagKind: validate(TagKindCreateInput),
    tag: validate(TagCreateInput),
  },
});

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
