
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient,trpc } from '@/trpc/server';

import { ProductList } from '@/modules/product/ui/components/product-list';
import { Suspense } from 'react';


// localhost:3000/[category]/page
interface Props {
  params: {
    category: string
  }
}
const Page = async ({ params}: Props) => {
  const { category } = await params;
  // prefetch product data before rendering
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getManyByCategory.queryOptions({
    category: category
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList category={''}/>
      </Suspense>
      
    </HydrationBoundary>
  )
}

export default Page;