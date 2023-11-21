import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { cuid } from "~/utils/validators";

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
});
