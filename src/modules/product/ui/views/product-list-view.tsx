
import { ProductSort } from "../components/product-sort"
import { ProductFilters } from "../components/filter-product"
import { Suspense } from "react"
import { ProductList } from "../components/product-list"
import { dehydrate } from '@tanstack/react-query';
import { HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
interface Props {
    category?: string
    slug?: string
}
export const ProductListView = ({ category, slug }: Props) => {

    return (

        <div className='px-4 lg:px-12 py-8 flex flex-col gap-4'>
            <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-y-0 justify-between">
                <p className="font-medium text-2xl">Curated for you</p>
                <ProductSort />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gay-y-6 gap-x-12">
                <div className="lg:col-span-2 xl:col-span-2">
                    <ProductFilters />
                </div>
            </div>

            <div className="lg:col-span-4 xl:col-span-6">
                <Suspense fallback={<div>Loading products...</div>}>
                    <ProductList category={category || ''} slug={slug||""} />
                </Suspense>


            </div>
        </div>
    )
}