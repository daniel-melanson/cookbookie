import {
  UnitSystem as PrismaUnitSystem,
  UserRole as PrismaUserRole,
  RecipeDifficulty,
  type Prisma,
} from "@prisma/client";
import { z } from "zod";

export const cuid = () => z.string().cuid();
export const name = (max = 64) => z.string().min(2).max(max);
export const url = () => z.string().url().min(5).max(1024);
export const unitAbbr = () => z.string().min(1).max(5);
export const quantity = () => z.number().min(0).max(10000);

export const password = () =>
  z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password must be at most 128 characters.")
    .regex(/\d/, "Password must contain a number.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(
      /[!"#$%&'()*+,-./:;<=>?@\\\[\]^_`{|}~]/,
      "Password must contain at least one special character.",
    )
    .regex(
      /^[A-Za-z\d!"#$%&'()*+,-./:;<=>?@\\\[\]^_`{|}~]+$/,
      "Password must only contain English characters.",
    );

export const UserRole = z.nativeEnum(PrismaUserRole);

export const UnitSystem = z.nativeEnum(PrismaUnitSystem);

export const UserCreateInput = z.object({
  firstName: name(),
  lastName: name(),
  email: z.string().email().min(3).max(512),
  password: z.string().optional(),
  dateOfBirth: z.date(),
  avatar: url().optional(),
  role: UserRole,
  emailVerified: z.date().optional(),
  unitSystem: UnitSystem,
}) satisfies z.Schema<Prisma.UserUncheckedCreateInput>;

export const ProvidedUserCreateInput = UserCreateInput.pick({
  firstName: true,
  lastName: true,
  email: true,
  dateOfBirth: true,
  unitSystem: true,
});

export const Unit = z.object({
  abbreviation: unitAbbr(),
  name: name(32),
  system: UnitSystem,
});

export const IngredientCreateInput = z.object({
  name: name(128),
  icon: url(),
}) satisfies z.Schema<Prisma.IngredientUncheckedCreateInput>;

export const RecipeCreateInput = z.object({
  name: name(128),
  description: z.string().max(2048),
  source: url(),
  icon: url(),
  difficulty: z.nativeEnum(RecipeDifficulty),
}) satisfies z.Schema<Prisma.RecipeUncheckedCreateInput>;

export const IngredientQuantityCreateInput = z.object({
  ingredientId: z.string().cuid(),
  usQuantity: quantity(),
  usUnitAbbreviation: unitAbbr(),
  metricQuantity: quantity(),
  metricUnitAbbreviation: unitAbbr(),
}) satisfies z.Schema<Prisma.IngredientQuantityUncheckedCreateInput>;

export const TagKindCreateInput = z.object({
  name: name(),
}) satisfies z.Schema<Prisma.TagKindUncheckedCreateInput>;

export const TagCreateInput = z.object({
  name: name(),
  kindName: name(),
}) satisfies z.Schema<Prisma.TagUncheckedCreateInput>;
