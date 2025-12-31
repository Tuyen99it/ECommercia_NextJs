"use client";
import { useTRPC } from '@/trpc/client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductGetManyOutput, ProductGetOneOutput } from '../../server/types';
import { useProductFilters } from '../../hooks/use-product-filter';
import { ProductCard } from './product-card';
interface Prop {
    category?: string,
    slug?: string
}
export const ProductList = ({ category, slug }: Prop) => {
    const [filters] = useProductFilters()

    const trpc = useTRPC();

    const { data } = useSuspenseQuery(
        trpc.products.getMany.queryOptions({
            category,
            slug,
            ...filters
        }))
    console.log("product data at client " + JSON.stringify(data, null, 2))
    // clear/ normalize data
    const products = data?.docs ?? {} as ProductGetManyOutput
    console.log("products in client" + JSON.stringify(products, null, 2))
    if (!products || products?.length === 0) {
        return (
            <div className="flex h-40 items-center justify-center text-muted-foreground">No producs found</div>
        )
    }
    return (
        <section className="mx-auto max-w-7xl px-4 py-6 ">
            <div className="grid grid-cols-1 gap-6 items-left sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {products.map((product: ProductGetOneOutput) => (
                    <ProductCard key={product.id} id={product.id} name={product.name} imageUrl="" tenantSlug={product?.tenant?.name} tenantImageUrl={product?.tenant?.imageUrl} reviewRating={(3)} reviewCount={(5)} price={product.price} />
                ))}
            </div>
        </section>
    )
}