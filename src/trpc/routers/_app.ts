import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { categoriesRouter } from '../../modules/categories/server/procedures';
// use cateroriesRouter
export const appRouter = createTRPCRouter({
 categories:categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;