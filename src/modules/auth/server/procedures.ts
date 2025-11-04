import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import {headers as getHeaders,cookies as getCookies} from "next/headers";
import z from "zod"
import { AUTH_COOKIE } from "../constants";
export const authRouter=createTRPCRouter({
    session:baseProcedure.query(async ({ctx})=>{
        const headers =await getHeaders();
        const session=await ctx.payload.auth({headers})
        return session;
    }),
    register: baseProcedure  
        .input(
            z.object({
                email:z.string().email(),
                password:z.string(),
                username:z
                    .string()
                    // [username].shop.com
                    .min(3,"Usename must be at least 3 characters")
                    .max(63,"Username must least than 63 characters")
                    .regex(/^[A-Za-z0-9\-_]+\.?[A-Za-z0-9\-_]*\.?[A-Za-z0-9\-_]*$/,"UserName only letters, numbers, hyphens (-), underscores (_), and up to two dots (.) are allowed. The name cannot start or end with a dot.")
                    .refine(
                        (val)=>!val.includes("--"),
                        "UserName can not contain consecutive hyphens"
                        
                    )
                    .transform((val)=>val.toLocaleLowerCase())
                })
        )
        .mutation(async({input,ctx})=>{
            await ctx.payload.create({
                collection:"users",
                data:{
                    email:input.email,
                    username:input.username,
                    password:input.password,
                }
            })
             const data=await ctx.payload.login({
                 collection:"users",
                data:{
                    email:input.email,
                    password:input.password,
                }
            })
            if(!data.token){
                throw new TRPCError({
                    code:"UNAUTHORIZED",
                    message: "Failed to login"
                })
            }
            const cookies =await getCookies();
            cookies.set({
                name:AUTH_COOKIE,
                value:data.token,
                httpOnly:true,
                path:"/"
                // TODO: NEsure cross-domain cookie sharing
                // runroad.com // initial cookie
                // 
            })
            return data;
        }),
    login: baseProcedure  
        .input(
            z.object({
                email:z.string().email(),
                password:z.string(),
                
                })
        )
        .mutation(async({input,ctx})=>{
            const data=await ctx.payload.login({
                 collection:"users",
                data:{
                    email:input.email,
                    password:input.password,
                }
            })
            if(!data.token){
                throw new TRPCError({
                    code:"UNAUTHORIZED",
                    message: "Failed to login"
                })
            }
            const cookies =await getCookies();
            cookies.set({
                name:AUTH_COOKIE,
                value:data.token,
                httpOnly:true,
                path:"/"
                // TODO: NEsure cross-domain cookie sharing
                // runroad.com // initial cookie
                // 
            })
            return data;
        }),
    logout:baseProcedure.mutation(async ()=>{
        const cookies=await getCookies();
        cookies.delete(AUTH_COOKIE)
    })
})