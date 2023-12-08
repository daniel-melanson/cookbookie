import { exampleRouter } from "~/server/api/routers/example";
import { userRouter } from "./routers/user";
import { createTRPCRouter } from "~/server/api/trpc";
import { recipeRouter } from "~/server/api/routers/recipes";
import { ingredientRouter } from "~/server/api/routers/ingredients";
import { tagRouter } from "./routers/tag";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  recipes: recipeRouter,
  ingredients: ingredientRouter,
  example: exampleRouter,
  users: userRouter,
  tag: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
