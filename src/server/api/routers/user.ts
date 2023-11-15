import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { password } from "~/utils/validators";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  registerUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: password(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userCount = await ctx.prisma.user.count({
        where: { email: input.email },
      });

      if (userCount !== 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User with email already exists.",
        });
      }

      await ctx.prisma.user.create({
        data: {
          email: input.email,
          password: await hash(input.password, 12),
          // TODO: Take input for the following fields
          firstName: "First name",
          lastName: "Last name",
          dateOfBirth: new Date(),
          unitSystem: "US",
          role: "USER",
        },
      });

      return { email: input.email, password: input.password };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
