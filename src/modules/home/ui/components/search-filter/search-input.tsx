"use client"
import {BookmarkCheck, BookmarkCheckIcon, ListFilterIcon, SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { is } from "zod/v4/locales";
interface Props{
    disable?:boolean,
  
}
export const SearchInput =({
    disable,
   
}:Props)=>{
    const trpc=useTRPC()
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());
    const [isSidebarOpen, setIsSidebarOpen]=useState(false);
    const session=useQuery(trpc.auth.session.queryOptions())
    return (
        <div className=" flex items-center w-full">
            <CategoriesSidebar  open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>
         
            <div className=" flex flex-col gap-2 relative w-full">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500"/>
                <Input  className="pl-8 h-10"  placeholder="Search Category"  />
            </div>
            {/* Todo: Add categories view all button */}
            <Button
            variant={"elevated"}
            className="size-12 shrink-0 flex lg:hidden"
            onClick={()=>setIsSidebarOpen(true)}>
                <ListFilterIcon/>
            </Button>
           
                { 
                session.data?.user&&(
                    <Button
                    asChild
                    variant="elevated"
                     className="h-10 flex items-center gap-1" // 👈 same height & spacing
                    >
                        <Link href="library" className="mr-2">
                        <BookmarkCheckIcon/>
                        Library
                        </Link>
                    </Button>
                )
            }
            
        </div>
    )
}
