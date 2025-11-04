import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const result = await ctx.payload.find({
      collection: "categories",
      depth: 2,
      pagination: false,
      where: {
        parent: { exists: false },
      },
      sort: "name",
    });

        // Format each category and flatten its subcategories
        const categories = result.docs.map((category) => ({
            ...category,
            subcategories: (category.subcategories?.docs ?? []).map((sub) => ({
                ...(sub as Category),
                // Remove nested subcategories to prevent deep nesting
                subcategories: undefined,
            })),
        }));
    return categories;
  }),
});
