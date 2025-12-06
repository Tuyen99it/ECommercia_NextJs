'use client';
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
export const SearchFilters = () => {
    // const trpc = useTRPC();
    // // Suspend : use to pause render page while do something: same as loading page progress while load data
    // let { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    // // console.log( " This is the data prefetch from Search filter");
    // // console.log(JSON.stringify(data,null,2))
    // data = data?.json;
    // console.log(data);
    return (
        <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
            <SearchInput />
            <div className="hidden lg:block">
                <Categories  />
            </div>
            {/* show breadcrumbs */}
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