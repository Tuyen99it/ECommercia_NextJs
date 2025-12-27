import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import { baseProcedure, createTRPCRouter } from '../init';
import { categoriesRouter } from '../../modules/categories/server/procedures';
import { authRouter } from '@/modules/auth/server/procedures';
import { ProductsRouter } from '@/modules/product/server/procedures';
import { tagsRouter } from '@/modules/tags/servers/procedures';
import { tenantsRouter } from '@/modules/tenants/server/procedure';
export const t = initTRPC.create();
const appRouter1 = t.router({
  // Create procedure at path 'login'
  // The syntax is identical to creating queries
  login: t.procedure
    // using zod schema to validate and infer input values
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation((opts) => {
      // Here some login stuff would happen
      console.log(opts.input.name)
      return {
        user: {
          name: opts.input.name,
          role: 'ADMIN',
        },
      };
    }),
});
// use cateroriesRouter
export const appRouter = createTRPCRouter({
    test:appRouter1,
    auth: authRouter,
    categories: categoriesRouter,
    products:ProductsRouter,
    tags:tagsRouter,
    tenants:tenantsRouter

});
export const caller=appRouter.createCaller({});
// export type definition of API
export type AppRouter = typeof appRouter;


