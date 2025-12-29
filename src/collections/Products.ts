import type { CollectionConfig } from "payload";
import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";
export const defaultTenantsArrayField = tenantsArrayField({
    tenantsArrayFieldName: "tenants",
    tenantsCollectionSlug: "tenants",
    tenantsArrayTenantFieldName: "tenant",
    arrayFieldAccess: {
        read: () => true,
        create: () => true,
        update: () => true,


    },
    tenantFieldAccess: {
        read: () => true,
        create: () => true,
        update: () => true

    }


})
const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name"
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
            name: "category",
            type: "relationship",
            relationTo: "categories" as any,
            hasMany: false

        },
        {
            name: "description",
            type: "textarea",
            required: false,

        },
        {
            name: "images",
            type: "upload",
            relationTo: "media",
            hasMany: true,
        }, {
            name: "refundPolicy",
            type: "select",
            options: ["30-day", "12-day", "no-refund"],
            defaultValue: "30-day",
            required: true,

        },
        {
            name: "tags",
            type: "relationship",
            relationTo: "tags",
            hasMany: true

        },
        {
            ...defaultTenantsArrayField,
            admin: {
                position: "sidebar"
            }
        }

    ]
}
export default Products;