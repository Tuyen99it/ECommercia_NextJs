import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Product } from "@/payload-types";
import Categories from '../../../collections/Categories';
import type { Category } from "@/payload-types";
import z from "zod"
import { TRPCError } from "@trpc/server";

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
      category: z.string().optional(),// allow underfined
    }))
    .query(async ({ ctx, input }) => {
     console.log("category input: "+input.category)
      // find category by name
      const categoryResult = await ctx.payload.find({
        collection: "categories",
        depth: 0,
        pagination: false,
        where: {
          slug: {
            equals: input.category
          }
        }
      })
      console.log("prefetch category slug: "+JSON.stringify(categoryResult,null,2))
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
