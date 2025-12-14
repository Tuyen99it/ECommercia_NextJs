"use client"
import { useRouter } from "next/navigation";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { SubCategoryMenu } from './subcategory-menu';
import { CategoriesGetManyOutput } from "@/modules/categories/types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
   
}
export const CategoriesSidebar = ({
    open,
    onOpenChange,
   

}: Props) => {
    const trpc=useTRPC();
    const {data}=useSuspenseQuery(trpc.categories.getMany.queryOptions());
    const router = useRouter();
    const [parentCategories, setParentCategories] = useState<CategoriesGetManyOutput | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<CategoriesGetManyOutput[number] | null>(null)
    // if we have parent categories, show those, otherwise show root categories
    // Normalize data so it's always an array
    const currentCategories = parentCategories ?? data.json ?? [];
    console.log("Current categoriesL",currentCategories)
    // const currentCategories 
    //   (Array.isArray(parentCategories) && parentCategories) ||
    //   (Array.isArray(data) ? data : data?.json ?? []);
    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null)
        setParentCategories(null);
        onOpenChange(open)
    }
    const handleCategoryClick = (category: CategoriesGetManyOutput[number]) => {
        if (category.subcategories && category.subcategories.length > 0) {
            // cast through unknown when narrowing incompatible array element types
            setParentCategories(category.subcategories as unknown as CategoriesGetManyOutput);
            setSelectedCategory(category);
        }
        else {
            // this is a leaf category ( no suvcategories)
            if (parentCategories && selectedCategory) {
                // this is a sub category -navigate to /category/subcategory
                router.push(`/${selectedCategory.slug}/${category.slug}`)
            } else {
                // this is a main category -navigate to/category
                if (category.slug === "all") {
                    router.push("/")
                } else {
                    router.push(`/${category.slug}`);
                }
            }
            handleOpenChange(false);
        }
    }
    const backgroundColor = selectedCategory?.color || "white";
    const handleBackClick = () => {
        if (parentCategories) {
            setParentCategories(null)
            setSelectedCategory(null)
        }
    }
    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent side="left"
                className="P-0 transition-none"
                style={{ backgroundColor }}>
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>
                        Categories
                    </SheetTitle>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (<button onClick={handleBackClick}
                        className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
                    >
                        <ChevronLeftIcon className="size-4 mr-2" />
                        Back
                    </button>)
                    }
                    {currentCategories.map((category) => (
                        <button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category)}
                            className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center justify-between text-base font-medium cursor-pointer"
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 &&
                                (<ChevronRightIcon className="size-4 " />)
                            }

                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}