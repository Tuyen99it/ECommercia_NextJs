"use client";
import { CategoryDropdown } from "./category-dropdown";
import { Category } from "../../../../../payload-types";
import { CustomCategory } from "../types";
import { useEffect, useRef, useState } from "react";
import withPayload from "@payloadcms/next/withPayload";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
// Define or import the Category type


interface Props {
    data: any;
}

export const Categories = ({
    data,
}: Props) => {

    // reponsive categories
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const viewAllRef = useRef<HTMLDivElement>(null);
    const [visibleCount, setVisibleCount] = useState(data.length)
    const [isAnyHovered, setIsAnyHovered] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const activeCategory = "all"
    const aciveCategoryIndex = data.findIndex((cat) => cat.slug === activeCategory);
    const isActiveCategoriesHidden = aciveCategoryIndex >= visibleCount && aciveCategoryIndex !== -1;

    useEffect(() => {
        // use to hind the category that is over viewport
        const calculateVisible = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availableWidth = containerWidth - viewAllWidth;
            const items = Array.from(measureRef.current.children);
            let totalWidth = 0;
            let visible = 0;
            for (const item of items) {
                const width = item.getBoundingClientRect().width;
                if (totalWidth + width > availableWidth) break;
                totalWidth += width;
                visible++;

            }
            setVisibleCount(visible);
        }
        const resizeObserver = new ResizeObserver(calculateVisible);
        resizeObserver.observe(containerRef.current!);
        return () => resizeObserver.disconnect();
    }, [data.length])
    return (
        <div className="relative w-full">
            {/* Categories sidebar */}
            <CategoriesSidebar open={isSideBarOpen} onOpenChange={setIsSideBarOpen} data={data}/>
            {/* Hidden div to measure all items*/}
            <div
                ref={measureRef}
                className="absolute opacity-0 pointer-events-none flex"
                style={{ position: "fixed", top: -9999, left: -9999 }}
            >
                {data.map((category: Category) => (
                    <div key={category.id} >
                        <CategoryDropdown
                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={false}
                        />
                    </div>
                ))}
            </div>
            {/* Visible items */}
            <div ref={containerRef}
                className="flex flex-nowrap items-center"
                onMouseEnter={() => setIsAnyHovered(true)}
                onMouseLeave={() => setIsAnyHovered(false)}>
                {
                    data.slice(0, visibleCount).map((category) => (
                        <CategoryDropdown
                            category={category}
                            isActive={activeCategory === category.slug}
                            isNavigationHovered={false}
                        />
                    ))
                }
                <div
                    ref={viewAllRef} className="shrink-0"
                >
                    <Button className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                        isActiveCategoriesHidden && isAnyHovered && "bg-white border-primary "
                    )} onClick={()=>setIsSideBarOpen(true)}>
                        ViewAll
                        <ListFilterIcon className="ml-2" />

                    </Button>
                </div>
            </div>

        </div>
    );
}

