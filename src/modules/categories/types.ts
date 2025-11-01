import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";
import Categories from '../../collections/Categories';

export type CategoriesGetManyOutput =inferRouterOutputs<AppRouter>["categories"]["getMany"]
export type CategoriesGetManyOutputSingle=CategoriesGetManyOutput[0]