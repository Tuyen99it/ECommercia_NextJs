import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Product } from "@/payload-types";
import Categories from '../../../collections/Categories';

export const ProductsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx}) => {
    const result = await ctx.payload.find({
      collection: "products",
      depth: 1,
      pagination: false,
     
      sort: "name",
    });

        // Format each category and flatten its subcategories
        // const product = result.docs.map((product) => ({
        //     ...product,
        //     category: (product.Categories?.docs ?? null).map((sub) => ({
        //         ...(sub as Category),
        //         // Remove nested subcategories to prevent deep nesting
        //         subcategories: undefined,
        //     })),
        // }));
        console.log(JSON.stringify(result,null,2));
    return result;
  }),
});
