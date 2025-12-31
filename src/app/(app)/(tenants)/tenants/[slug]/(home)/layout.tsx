
import { Navbar } from "@/modules/tenants/ui/navbar"
import { Footer } from "@/modules/tenants/ui/footer";
import { NavbarSkeleton } from "@/modules/tenants/ui/navbar";

import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
interface LayoutProp {
    children: React.ReactNode;
    params: Promise<{ slug: string }>
}

const Layout = async ({ children, params }: LayoutProp) => {
    const { slug } = await params;
    const queryClient = getQueryClient();

    await Promise.all([
        queryClient.prefetchQuery(
            trpc.tenants.getOne.queryOptions({ slug })
        ),
        queryClient.prefetchQuery(
            trpc.products.getMany.queryOptions({ slug })
        ),
    ]);
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="min-h-screen bg-white flex flex-col">
                <Suspense fallback={(<NavbarSkeleton />
                )}>
                    <Navbar slug={slug} />
                    {children}
                    <Footer />
                </Suspense>

            </div>
        </HydrationBoundary>

    )
}
export default Layout;
