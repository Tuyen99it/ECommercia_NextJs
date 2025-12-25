"use client";
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductGetManyOutput, ProductGetOneOutput } from '../../server/types';
import { useProductFilters } from '../../hooks/use-product-filter';
import { ProductCard } from './product-card';


interface Prop {
    category?: string
}
export const ProductList = ({ category }: Prop) => {
    const [filters] = useProductFilters()

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(
        trpc.products.getMany.queryOptions({
            category,
            ...filters
        }))

    const products: ProductGetManyOutput = (data.json as ProductGetManyOutput) || [];
    if (!products || products?.length === 0) {
        return (
            <div className="flex h-40 items-center justify-center text-muted-foreground">No producs found</div>
        )
    }
    return (
        <section className="mx-auto max-w-7xl px-4 py-6 ">
            <div className="grid grid-cols-1 gap-6 items-left sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                    <ProductCard id={product.id} name={product.name} authorUserName='Tuyen99it' authorImageUrl="/backgroundproduct.png" reviewRating={(3)} reviewCount={(5)} price={product.price} />
                ))}
            </div>
        </section>
    )
}