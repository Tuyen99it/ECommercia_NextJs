'use client';
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const SearchFilters = () => {
    const trpc = useTRPC();
    // Suspend : use to pause render page while do something: same as loading page progress while load data
    let { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
<<<<<<< HEAD
    data = data?.json;
    console.log(data);
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
            <SearchInput  data={data}/>
            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
=======
    data=data?.json
    console.log("start data");
    console.log(data)
    console.log("end data")
    
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
            <SearchInput data={data}/>
            {/* <div className="hidden lg:block">
                <Categories/>
            </div> */}
>>>>>>> 08_Authentication

        </div>
    )
}
export const SearchFiltersSkeleton = () => {
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
            <SearchInput disable />
            <div className="hidden lg:block">
            </div>

        </div>
    )
}