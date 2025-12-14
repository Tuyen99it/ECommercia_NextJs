"use client";
import { useTRPC } from '@/trpc/client';
import { ProductCard } from './product-card';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductGetManyOutput, ProductGetOneOutput } from '../../server/types';

interface Prop {
    category?: string
}
export const ProductList = ({ category }: Prop) => {
    const trpc = useTRPC();
   const { data } = useSuspenseQuery(
    category
      ? (trpc.products.getManyByCategory.queryOptions({
          category,
        }) as any)
      : (trpc.products.getMany.queryOptions() as any)
  );


    const products: ProductGetManyOutput = data?.json|| [];

    console.log("Product List data: " + JSON.stringify(products, null, 2));
    if (products?.length === 0) {
        return (
            <div className="flex h-40 items-center justify-center text-muted-foreground">No producs found</div>
        )
    }
    return (
        <section className="mx-auto max-w-7xl px-4 py-6 ">
            <div className="grid grid-cols-1 gap-6 items-left sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products?.map((product: ProductGetOneOutput) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    )
}