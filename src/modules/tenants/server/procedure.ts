import { baseProcedure } from "@/trpc/init";
import { createTRPCRouter } from "@/trpc/init";
export const tenantsRouter=createTRPCRouter({
    getMany:baseProcedure.query(async({ctx})=>{
        const result=await ctx.payload.find({
            collection:"tenants",
            depth:0,
            where:{}
        })
        return result.docs[0]
    })

})