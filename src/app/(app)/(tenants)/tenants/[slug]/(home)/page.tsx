    import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
    import { getQueryClient, trpc } from '@/trpc/server';

    import { ProductList } from '@/modules/product/ui/components/product-list';
    import { Suspense } from 'react';
    import { ProductFilters } from '@/modules/product/ui/components/filter-product';
    import { SearchParams } from "nuqs/server"
    import { loadProductFilters } from '@/modules/product/hooks/search-params';
    import { ProductSort } from '@/modules/product/ui/components/product-sort';
    import { ProductListView } from '@/modules/product/ui/views/product-list-view';

    // localhost:3000/[category]/page
    interface Props {
    searchParams: Promise<SearchParams>
        params: Promise<{ slug: string }>
    }
    const Page = async ({ params, searchParams }: Props) => {
    const { slug } = await params;
    console.log("Data in slug:"+slug)
        const filters = await loadProductFilters(searchParams)
        const queryClient = getQueryClient()
        void queryClient.prefetchQuery(trpc.products.getMany.queryOptions(
            {
                ...filters,
                slug: slug,
            }
        ))

        return (
            <HydrationBoundary state={dehydrate(queryClient)}>
                <ProductListView slug={slug} />
            </HydrationBoundary>
        )
    }

    export default Page;