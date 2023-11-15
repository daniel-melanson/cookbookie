import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const ingredientRouter = createTRPCRouter({
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
        select: {
          name: true,
          icon: true,
          id: true,
        },
      });
    }),
});
