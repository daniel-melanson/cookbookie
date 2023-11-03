import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cuid } from "~/utils/validators";
import { z } from "zod";

export const recipeRouter = createTRPCRouter({
  search: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).int().default(1),
        where: z.object({}).optional(),
        orderBy: z
          .union([z.literal("createdAt"), z.literal("popularity")])
          .default("createdAt"),
        order: z.enum(["asc", "desc"]).default("desc"),
      }),
    )
    .query(async ({ ctx, input }) => {
      const PAGE_SIZE = 40;

      const recipes = await ctx.prisma.recipe.findMany({
        skip: (input.page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        where: input.where,
        orderBy: { [input.orderBy]: input.order },
      });

      const totalCount = await ctx.prisma.recipe.count({
        where: input.where,
      });

      return { recipes, pageCount: Math.ceil(totalCount / PAGE_SIZE) };
    }),

  get: publicProcedure.input(cuid()).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findUnique({
      where: { id: input },
    });
  }),
});
