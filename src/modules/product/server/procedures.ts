import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Category } from "@/payload-types";
import z from "zod"
import { TRPCError } from "@trpc/server";
import { Where, Sort } from "payload";
import { sortValues } from "../hooks/search-params";


export const ProductsRouter = createTRPCRouter({

  getMany: baseProcedure
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
          less_than_equal: input.maxPrice
        }
      }
      if (!input.category) {
        //cateogry top-level
        const categoryWithoutParent = await ctx.payload.find({
          collection: "categories",
          depth: 0,
          pagination: false,
          where: {
            parent: {
              exists: false
            }
          }
        })
        if (!categoryWithoutParent.docs || categoryWithoutParent.docs.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No top-level categories found"
          });
        }
        const cateogryWithoutParentIds = categoryWithoutParent.docs.map((cat) => cat.id)
        where.category = {
          in: cateogryWithoutParentIds
        }
      }
      else {
        const category=await ctx.payload.find({
          collection:"categories",
          depth:0,
          pagination:false,
          where:{
            slug:{equals:input.category}
          }
        })
        if (!category.docs || category.docs.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No category found"
          });
        }
        
        where.category = {
          equals: category.docs[0].id
        }
      }
      console.log("data in where")
      console.log(JSON.stringify(where, null, 2))
      // get product
      const result = await ctx.payload.find({
        collection: "products",
        depth: 2,
        pagination: false,
        where: where,
        sort: sort
      })
      if (!result.docs || result.docs.length === 0) {
        console.log("product not found");
        return result.docs
      }
      const products = result.docs.map((product) => ({
        ...product,

      }))
      console.log("product ")
      console.log(JSON.stringify(products, null, 2))
      return products
    })


})

