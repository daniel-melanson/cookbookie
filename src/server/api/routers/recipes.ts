import { type Recipe } from "@prisma/client";
import {
  createTRPCRouter,
  searchProcedure,
  publicProcedure,
  type SearchResults,
} from "~/server/api/trpc";
import { cuid } from "~/utils/validators";

export const recipeRouter = createTRPCRouter({
  search: searchProcedure({}).query(async ({ ctx, input }) => {
    input.orderBy ??= input.query ? "relevance" : "popularity";

    const PAGE_SIZE = 48;

    // TODO implement where clause from input.filters
    const recipes = await ctx.prisma.recipe.findMany({
      skip: (input.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    // TODO use where clause here too
    const totalCount = await ctx.prisma.recipe.count({});

    return {
      results: recipes,
      totalCount,
      pageCount: Math.ceil(totalCount / PAGE_SIZE),
    } as SearchResults<Recipe>;
  }),

  get: publicProcedure.input(cuid()).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findUnique({
      where: { id: input },
    });
  }),
});
