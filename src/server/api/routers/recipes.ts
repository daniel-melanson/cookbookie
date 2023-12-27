import { type Recipe } from "@prisma/client";
import {
  createTRPCRouter,
  searchProcedure,
  publicProcedure,
  type SearchResults,
  getSearchSuggestionsProcedure as getSearchSuggestionsProcedure,
} from "~/server/api/trpc";
import { cuid } from "~/utils/validators";

const EMBED_SELECT = {
  name: true,
  icon: true,
  id: true,
};

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

  getSearchSuggestions: getSearchSuggestionsProcedure().query(
    async ({ ctx, input }) => {
      return ctx.prisma.recipe.findMany({
        take: 12,
        orderBy: {
          _relevance: {
            fields: ["name"],
            search: input.split(" ").join(" <-> "),
            sort: "desc",
          },
        },
        select: EMBED_SELECT,
      });
    },
  ),

  get: publicProcedure.input(cuid()).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findUnique({
      where: { id: input },
    });
  }),
});
