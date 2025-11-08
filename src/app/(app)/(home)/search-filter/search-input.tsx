"use client"
import {ListFilterIcon, SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
interface Props{
    disable?:boolean,
<<<<<<< HEAD
    data:any
   
=======
   data:CategoriesGetManyOutput
>>>>>>> 08_Authentication
}
 export const SearchInput =({
    disable,
    data
}:Props)=>{
    console.log(data)
    const [isSidebarOpen, setIsSidebarOpen]=useState(false);
<<<<<<< HEAD
    // const trpc=useTRPC()
    // const {data}=useSuspenseQuery(trpc.categories.getMany.queryOptions())
=======
    
>>>>>>> 08_Authentication
    return (
        <div className=" flex items-center w-full">
            <CategoriesSidebar  open={isSidebarOpen} onOpenChange={setIsSidebarOpen} data={data}/>
         
            <div className=" flex flex-col gap-2 relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500"/>
                <Input className=" pl-8" placeholder="Search Category" disable={disable} />
            </div>
            {/* Todo: Add categories view all button */}
            <Button
            variant={"elevated"}
            className="size-12 shrink-0 flex lg:hidden"
            onClick={()=>setIsSidebarOpen(true)}>
                <ListFilterIcon/>
            </Button>
        </div>
    )
}
