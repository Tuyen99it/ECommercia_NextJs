import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Category } from "@/payload-types";
import z from "zod"
import { TRPCError } from "@trpc/server";
import { Where, Sort } from "payload";
import { sortValues } from "../hooks/search-params";
import { Media } from "@/payload-types";
import { Tenant } from "@/payload-types";
import { ProductGetManyOutput } from "./types";


export const ProductsRouter = createTRPCRouter({

  getMany: baseProcedure
    .input(z.object({
      category: z.string().nullable().optional(),// allow underfined
      minPrice: z.string().nullable().optional(),
      maxPrice: z.string().nullable().optional(),
      tags: z.array(z.string()).nullable().optional(),
      sort: z.enum(sortValues).nullable().optional(),
      slug: z.string().nullable().optional(),

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
      if (input.slug) {
        const tenantSlug = await ctx.payload.find({
          collection: "tenants",
          depth: 0,
          where: {
            slug: {
              equals: input.slug
            }
          }
        })
        if (!tenantSlug) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "tenant slug is not found"
          })
        }


        where["tenants.tenant"] = {
          equals: tenantSlug.docs[0].id,
        };

      }
  
      if(input.category){
        const category = await ctx.payload.find({
          collection: "categories",
          depth: 0,
          pagination: false,
          where: {
            slug: { equals: input.category }
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
        depth: 1,
        pagination: true,
        where: where,
        sort: sort
      })
      console.log("data product result" + JSON.stringify(result.docs, null, 2))
      return {
        ...result,
        docs: result.docs.map((doc) => ({
          ...doc,
          image: doc.images as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    })


})

