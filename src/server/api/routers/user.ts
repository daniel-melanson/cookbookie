import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserCredentials: publicProcedure
    .input(z.object({email: z.string(), password: z.string()}))
    .query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({where: {
      email: input.email,
      password: input.password,
    }});
  }),

  getEmail: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({where: {
      email: input,
    }});
  }),

  registerUser: publicProcedure
    .input(z.object({email: z.string(), password: z.string()}))
    .mutation(({ ctx, input }) => {
    return ctx.prisma.user.create({data: {
      email: input.email,
      password: input.password,
      // TODO: Take input for the following fields
      firstName: "test",
      lastName: "test",
      dateOfBirth: Date(),
      unitSystem: "US",
    }});
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
