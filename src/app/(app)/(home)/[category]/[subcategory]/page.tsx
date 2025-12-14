
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient,trpc } from '@/trpc/server';

import { ProductList } from '@/modules/product/ui/components/product-list';
import { Suspense } from 'react';

interface Props {
  params: {
    category: string
    subcategory:string
  }
}
const Page = async ({ params}: Props) => {
  const { category,subcategory } = await params;
  // prefetch product data before rendering
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getManyByCategory.queryOptions({
    category: subcategory
  }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList category={subcategory}/>
      </Suspense>
      
    </HydrationBoundary>
  )
}
export default Page;