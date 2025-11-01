import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";
export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure.query(async ({ ctx }) => {
        // const payload=await getPayload({
        //     config:configPromise
        // due to connect to payload is usually , so we will config connect to payload in trpc/init.ts file
        // Fetch top-level categories (those without a parent)
        const result = await ctx.payload.find({
            collection: "categories",
            depth: 1,
            pagination: false,
            where: {
                parent: { exists: false },
            },
            sort:"name"
        });

        // Format each category and flatten its subcategories
        const categories = result.docs.map((category) => ({
            ...category,
            subcategories: (category.subcategories?.doc ?? []).map((sub) => ({
                ...(sub as Category),
                // Remove nested subcategories to prevent deep nesting
                subcategories: undefined,
            })),
        }));

        return categories;

    })
})


