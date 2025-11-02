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

    const categories = result.docs.map((category) => ({
      ...category,
      subcategories: (Array.isArray(category.subcategories)
        ? category.subcategories
        : []
      ).map((sub) => ({
        ...(sub as Category),
        subcategories: undefined,
      })),
    }));

    console.log("Loaded categories with subcategories:");
    console.log(categories);
    return categories;
  }),
});
