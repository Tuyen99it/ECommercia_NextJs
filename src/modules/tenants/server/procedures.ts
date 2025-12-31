import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { TRPCError } from '@trpc/server'
import { Where } from 'payload'
import { z } from 'zod'
import type { Tenant, Media } from '@/payload-types'

export const TenantsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
        slug: {
          equals: input.slug,
        },
      }

      const result = await ctx.payload.find({
        collection: 'tenants',
        depth: 1,
        pagination: false,
        limit: 1,
        where,
      })

      const tenant = result.docs[0]

      if (!tenant) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Tenant not found',
        })
      }

      return tenant as Tenant & { image: Media | null }
    }),
})
