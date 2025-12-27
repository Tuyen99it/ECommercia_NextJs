import type { CollectionConfig } from "payload"
import { Product } from "@/payload-types"
const Tenants: CollectionConfig = {
    slug: "tenants",
    admin: {
        useAsTitle: "name"
    },
    fields: [{
        name: "name",
        type: "text",
        required: true
    },
    {
        name:"slug",
        type:"text",
        required:true,
        unique:true,
        index:true
    },
    {
        name:"product",
        type:"relationship",
        relationTo:"products",
        hasMany:true
    },
    {
        name:"image",
        type:"relationship",
        relationTo:"media",
        hasMany:true
    }
    ]
}
export default Tenants;