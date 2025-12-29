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
        required: true,
        label: "Store name",
        admin: {
            description: "This is the name of store"
        }

    },
    {
        name: "slug",
        type: "text",
        required: true,
        unique: true,
        index: true,
        admin: {
            description: "This is te subdoman for the store"
        }
    },
    {
        name: "image",
        type: "upload",
        relationTo: "media",
        hasMany: true
    }, 
    {
        name: "tripeAccont",
        type: "text",
        required: true,
        admin: {
            readOnly: true,
        }
    },
    {
        name:"stripeDetailSubmit",
        type:"checkbox",
        admin:{
            readOnly:true,
            description:"You can not create product until you submit your Stripe Detail"
        }
    }
    ]
}
export default Tenants;