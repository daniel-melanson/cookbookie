import {
  type SearchResults,
  createTRPCRouter,
  publicProcedure,
  searchProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { cuid } from "~/utils/validators";
import { type Ingredient } from "@prisma/client";

const EMBED_SELECT = {
  name: true,
  icon: true,
  id: true,
};

export const ingredientRouter = createTRPCRouter({
  getEmbeds: publicProcedure
    .input(cuid().array())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.ingredient.findMany({
        where: { id: { in: input } },
        select: EMBED_SELECT,
      });
    }),

  embedSearch: publicProcedure
    .input(
      z
        .string()
        .min(3)
        .max(64)
        .transform((v) => v.toLowerCase().trim().replace(/\s+/g, " ")),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.ingredient.findMany({
        take: 24,
        orderBy: {
          _relevance: {
            fields: ["name"],
            search: input.split(" ").join(" <-> "),
            sort: "desc",
          },
        },
        select: EMBED_SELECT,
      });
    }),

  search: searchProcedure({}).query(async ({ ctx, input }) => {
    input.orderBy ??= input.query ? "relevance" : "popularity";

    const PAGE_SIZE = 128;

    // TODO implement where clause from input.filters
    const ingredients = await ctx.prisma.ingredient.findMany({
      skip: (input.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    // TODO use where clause here too
    const totalCount = await ctx.prisma.ingredient.count({});

    return {
      results: ingredients,
      totalCount,
      pageCount: Math.ceil(totalCount / PAGE_SIZE),
    } as SearchResults<Ingredient>;
  }),
});
