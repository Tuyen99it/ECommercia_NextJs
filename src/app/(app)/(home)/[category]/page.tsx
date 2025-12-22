
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';

import { ProductList } from '@/modules/product/ui/components/product-list';
import { Suspense } from 'react';
import { ProductFilters } from '@/modules/product/ui/components/filter-product';
import { SearchParams } from "nuqs/server"
import { loadProductFilters } from '@/modules/product/hooks/search-params';
import { ProductSort } from '@/modules/product/ui/components/product-sort';


// localhost:3000/[category]/page
interface Props {
  params: {
    category: Promise<string>
  }
  searchParams: Promise<SearchParams>
}
const Page = async ({ params, searchParams }: Props) => {
  const category = await params?.category as string
  const filters = await loadProductFilters(searchParams);


  console.log("data in filters: " + JSON.stringify(filters, null, 2))
  // prefetch product data before rendering
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getManyByCategory.queryOptions({
    category: category,
    ...filters
  }));

  return (
  
    <HydrationBoundary state={dehydrate(queryClient)}>
      <p>{JSON.stringify(searchParams)}</p>
      <div className='px-4 lg:px-12 py-8 flex flex-col gap-4'>
        <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-y-0 justify-between">
          <p className="font-medium text-2xl">Curated for you</p>
          <ProductSort/>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gay-y-6 gap-x-12">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
        </div>
        <div className="flex flex-col">
        <p>{JSON.stringify(filters,null)}</p>
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList category={''} />
          </Suspense>
        </div>
      </div>


    </HydrationBoundary>
  )
}

export default Page;