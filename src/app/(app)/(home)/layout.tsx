import configPromise from '../../../payload.config'
import { getPayload } from 'payload'
import { Category } from "../../../payload-types"
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/modules/home/ui/navbar";
import Footer from "@/modules/home/ui/footer";
import { SearchFilters, SearchFiltersSkeleton } from "@/modules/home/ui/components/search-filter";
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { SearchFilters,SearchFiltersSkeleton } from '@/modules/home/ui/search-filter';


export default async function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    // prefresh data from trpc server
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.categories.getMany.queryOptions(),
    )
   

    return (
       
        <div>
            <Navbar />
            {/* get data user Hydration Bondary and Leveraging Suspense */}
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={
                    <SearchFiltersSkeleton />
                }>
                    <SearchFilters />

                </Suspense>

            </HydrationBoundary>

            <div className="flex-1">
                {/* Chilren is the page in the body */}
                {children}
            </div>
            <Footer />
        </div>
      
    );
}
