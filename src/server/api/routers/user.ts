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
          firstName: "First Name",
          lastName: "Last Name",
          dateOfBirth: new Date(),
          unitSystem: "US",
          role: "USER",
        },
      });

      return { email: input.email, password: input.password };
    }),
  setUserInfo: protectedProcedure.input(
    z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      dateOfBirth: z.date().optional(),
      unitSystem: z.enum(["US", "METRIC"]),
    }),
  ).mutation(async ({ctx, input}) => {
    await ctx.prisma.user.update({where: {
      email: ctx.session.user.email ?? undefined,
    },
  data: {
      firstName: input.firstName ?? undefined,
      lastName: input.firstName ?? undefined,
      dateOfBirth: input.firstName ?? undefined,
      unitSystem: input.unitSystem,
  } })
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
