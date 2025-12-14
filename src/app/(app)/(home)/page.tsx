
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient,trpc } from '@/trpc/server';

import { ProductList } from '@/modules/product/ui/components/product-list';
import { Suspense } from 'react';

const Page = async () => {

  // prefetch product data before rendering
  // const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(trpc.products.getMany.queryOptions(
  // ));

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading products...</div>}>
        {/* <ProductList category={''}/> */}
      </Suspense>
      
    // </HydrationBoundary>
  )
}
export default Page;