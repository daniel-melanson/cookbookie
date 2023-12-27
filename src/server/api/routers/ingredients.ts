import {
  type SearchResults,
  createTRPCRouter,
  publicProcedure,
  searchProcedure,
  getSearchSuggestionsProcedure,
} from "~/server/api/trpc";
import { cuid } from "~/utils/validators";
import { type Ingredient } from "@prisma/client";

const EMBED_SELECT = {
  name: true,
  icon: true,
  id: true,
} as const;

export const ingredientRouter = createTRPCRouter({
  getEmbeds: publicProcedure.input(cuid().array()).query(({ ctx, input }) =>
    ctx.prisma.ingredient.findMany({
      where: { id: { in: input } },
      select: EMBED_SELECT,
    }),
  ),

  getEmbed: publicProcedure
    .input(cuid())
    .query(({ ctx, input }) =>
      ctx.prisma.ingredient.findUnique({ where: { id: input } }),
    ),

  getSearchSuggestions: getSearchSuggestionsProcedure().query(
    async ({ ctx, input }) => {
      return ctx.prisma.ingredient.findMany({
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
