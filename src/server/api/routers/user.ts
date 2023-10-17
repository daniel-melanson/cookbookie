import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserCredentials: publicProcedure
    .input(z.object({email: z.string(), password: z.string()}))
    .query(async ({ ctx, input }) => {
    return await ctx.prisma.user.findUnique({where: {
      email: input.email,
      password: input.password
    }});
  }),

  registerUser: protectedProcedure
    .input(z.object({email: z.string(), password: z.string()}))
    .mutation(async ({ ctx, input }) => {
    return await ctx.prisma.user.create({data: {
      email: input.email,
      password: input.password,
      // TODO: Take input for the following fields
      firstName: "",
      lastName: "",
      dateOfBirth: Date(),
      unitSystem: "US"
    }});
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
