import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { z } from "zod"
import { AUTH_COOKIE } from "../constants";
import { registerSchema } from "../schemas";
import { error } from "console";
export const authRouter = createTRPCRouter({

    session: baseProcedure.query(async ({ ctx }) => {
        const headers = await getHeaders();
        const session = await ctx.payload.auth({ headers })
        return session;
    }),
    register: baseProcedure
        .input(
            registerSchema


        )
        .mutation(async ({ input, ctx }) => {
            try {
                // validate email
                const exiistingData=await ctx.payload.find({
                    collection:"users",
                    limit:1,
                    where:{
                        username:{
                            equals:input.email
                        }
                    }
                })
                const existingUser=exiistingData.docs[0];
                if(existingUser){
                    throw new TRPCError({
                        code:"BAD_REQUEST",
                        message:"User already taken"
                    })
                }
                console.log("✅ Start create user", typeof(input.email));
                const created = await ctx.payload.create({
                    collection: "users",
                    data: {
                        email: input.email,
                        password: input.password,
                        username: input.username,

                    }
                })
                console.log("✅ User created:", created.id);
                const data = await ctx.payload.login({
                    collection: "users",
                    data: {
                        email: input.email,
                        password: input.password,
                    }
                })
                console.log("✅ Login success:", data);
                if (!data.token) {
                    throw new TRPCError({
                        code: "UNAUTHORIZED",
                        message: "Failed to login"
                    })
                }
                const cookies = await getCookies();
                cookies.set({
                    name: AUTH_COOKIE,
                    value: data.token,
                    httpOnly: true,
                    path: "/"
                    // TODO: NEsure cross-domain cookie sharing
                    // runroad.com // initial cookie
                    // 
                })
                console.log("🍪 Cookie set successfully");
                return data;
            } catch (err) {
                console.error("❌ Register failed:", err);

                if (err instanceof Error) {
                    console.error("❌ Error message:", err.message);
                    console.error("❌ Error stack:", err.stack);
                }

                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: err instanceof Error ? err.message : JSON.stringify(err),
                });
            }
        }),
    login: baseProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string(),

            })
        )
        .mutation(async ({ input, ctx }) => {
            const data = await ctx.payload.login({
                collection: "users",
                data: {
                    email: input.email,
                    password: input.password,
                }
            })
            if (!data.token) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "Failed to login"
                })
            }
            const cookies = await getCookies();
            cookies.set({
                name: AUTH_COOKIE,
                value: data.token,
                httpOnly: true,
                path: "/"
                // TODO: NEsure cross-domain cookie sharing
                // runroad.com // initial cookie
                // 
            })
            return data;
        }),
    logout: baseProcedure.mutation(async () => {
        const cookies = await getCookies();
        cookies.delete(AUTH_COOKIE)
    })
})