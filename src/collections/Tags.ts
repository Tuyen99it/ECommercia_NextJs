import type { CollectionConfig } from "payload";
import { Media } from '../payload-types';
const Tags: CollectionConfig = {
    slug: "tags",
    admin:{
        useAsTitle:"name"
    },
    access:{
        read:()=>true
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            unique:true
        },
        {
            name: "product",
            type: "relationship",
            relationTo:"products",
            hasMany:true
        },
       
    ]
}
export default Tags;