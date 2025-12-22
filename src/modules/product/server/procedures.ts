import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Category } from "@/payload-types";
import z from "zod"
import { TRPCError } from "@trpc/server";
import { Where,Sort } from "payload";
import { sortValues } from "../hooks/search-params";

export const ProductsRouter = createTRPCRouter({
  getMany: baseProcedure
    .query(async ({ ctx }) => {


      // 1. Find root categories
      const rootCategories = await ctx.payload.find({
        collection: "categories",
        depth: 0,
        pagination: false,
        where: {
          parent: {
            equals: null,
          },
        },
      });

      const rootCategoryIds = rootCategories.docs.map(cat => cat.id)
      const result = await ctx.payload.find({
        collection: "products",
        depth: 1,
        pagination: true,
        limit: 30,
        where: {
          category: {
            in: rootCategoryIds
          }
        }
      }
      );
      const products = result.docs.map((product) => ({
        ...product,
        category: product.category as Category,
      }));
      console.log("Get all Product:" + JSON.stringify(products, null, 2))
      return products;
    }),
  getManyByCategory: baseProcedure
    .input(z.object({
      category: z.string().nullable().optional(),// allow underfined
      minPrice: z.string().nullable().optional(),
      maxPrice: z.string().nullable().optional(),
      tags: z.array(z.string()).nullable().optional(),
      sort: z.enum(sortValues).nullable().optional()
    }))
    .query(async ({ ctx, input }) => {
      const where: Where = {};
      let sort: Sort = "-createdAt";
      if (input.sort === "curated") {
        sort = "-createdAt"
      }
      if (input.sort === "hot_end_new") {
        sort = "-name"
      }
      if (input.sort === "trending") {
        sort = "+createdAt"
      }
      if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice
        }
      }
      if (input.maxPrice) {
        where.price = {
          less_than_equal: input.minPrice
        }
      }
      console.log("category input: " + input.category)
      // find category by name
      const categoryResult = await ctx.payload.find({
        collection: "categories",
        depth: 0,
        where,
        sort
      })
      console.log("prefetch category slug: " + JSON.stringify(categoryResult, null, 2))
      const existingCategory = categoryResult.docs[0];
      if (!existingCategory) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Category is not exist"
        })
      }
      // find product by category
      const result = await ctx.payload.find({
        collection: "products",
        depth: 1,
        pagination: false,
        where: {
          category: {
            equals: existingCategory.id
          }
        }
      })
      if (result?.docs.length === 0) {
        return null;
      }
      //Format each product 
      const products = result.docs.map((product) => ({
        ...product,
        category: product.category as Category
      }));

      return products;
    }),
});
