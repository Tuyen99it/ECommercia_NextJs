import { SearchParams } from "nuqs/server";
import { ProductListView } from "@/modules/product/ui/views/product-list-view";
import { loadProductFilters } from "@/modules/product/hooks/search-params";
import { getQueryClient ,trpc} from "@/trpc/server";
import { HydrationBoundary,dehydrate } from "@tanstack/react-query";

interface Props{
    searchParams: Promise<SearchParams>
    params:Promise<{slug:string}>
}
const Page=async ({params,searchParams}:Props)=>{
    const {slug}=await params;
    const filters=await loadProductFilters(searchParams)
    const queryClient=  getQueryClient()
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions(
        {
            ...filters,
            tenantSlug:slug,
        }
    ))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductListView tenantSlug={slug}/>
        </HydrationBoundary>
    )
}