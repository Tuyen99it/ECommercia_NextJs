import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import {z} from "zod"
export const authRouter=createTRPCRouter({
    register: baseProcedure.input((z:))
})