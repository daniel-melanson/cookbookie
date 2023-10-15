import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { cuid } from "~/utils/validators";

export const recipeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recipe.findMany();
  }),

  get: publicProcedure.input(cuid()).query(({ ctx, input }) => {
    return ctx.prisma.recipe.findUnique({ where: { id: input } });
  }),
});
