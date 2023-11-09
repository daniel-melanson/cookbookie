import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cuid } from "~/utils/validators";
import { z } from "zod";

export const recipeRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).int().default(1),
        query: z.string().min(3).max(64).optional(),
        filters: z.object({}).optional(),
        orderBy: z.enum(["relevance", "popularity", "created-at"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      input.orderBy ??= input.query ? "relevance" : "popularity";

      const PAGE_SIZE = 48;

      const recipes = await ctx.prisma.recipe.findMany({
        skip: (input.page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      });

      const totalCount = await ctx.prisma.recipe.count({});

      return { recipes, pageCount: Math.ceil(totalCount / PAGE_SIZE) };
    }),

  get: publicProcedure.input(cuid()).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findUnique({
      where: { id: input },
    });
  }),
});
