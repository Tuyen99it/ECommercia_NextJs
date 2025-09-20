import type { CollectionConfig } from "payload";
const Categories: CollectionConfig = {
    slug: "categories",
    access: {
        create: () => false,
        update: () => false,
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        }
    ]
}
export default Categories;