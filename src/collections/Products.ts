import type { CollectionConfig } from "payload";
const Products: CollectionCOnfig = {
    slug: "products",
    admin:{
        useAsTitle:"name"
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            index: true,
        },
        {
            name: "price",
            type: "number",
            required: true,
        },
        {
            name:"category",
            type:"relationship",
            relationTo:"categories" as any,
            hasMany:false

        },
        {
            name:"description",
            type:"textarea",
            required:false,

        }
    ]
}
export default Products;