import { exampleRouter } from "~/server/api/routers/example";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { recipeRouter } from "~/server/api/routers/recipes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recipes: recipeRouter,
  example: exampleRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
