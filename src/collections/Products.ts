import type { CollectionConfig } from "payload";
import { Media } from '../payload-types';
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

        },
        {
            name:"images",
            type:"upload",
            relationTo:"media" as Media,
            hasMany:true,
        },{
            name:"refundPolicy",
            type:"select",
            options:["30-day","12-day","no-refund"],
            defaultValue:"30-day",
            required:true,
           
        }
    ]
}
export default Products;