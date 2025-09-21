"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"
import { useState, useRef } from "react";
import { useDropdownPosition } from "./use-dropdown";
import { SubCategoryMenu } from "./subcategory-menu";
import { Category } from "@/payload-types";
interface Props {
    category: Category;
    isActive?: boolean;
    isNavigationHovered?: boolean;

}
export const CategoryDropdown = ({
    category, isActive, isNavigationHovered
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const { getDropdownPosition } = useDropdownPosition(dropdownRef);
    const onMouseEnter = () => {
        console.log("hello");
        if (category.subcategories) {
            setIsOpen(true);
        }
    }
    const onMouseLeave = () => setIsOpen(false);
    let dropdownPosition = getDropdownPosition();
    return (
        <div className="relative">
            <div className="relative"
                ref={dropdownRef}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}>
                <Button variant="elevated"
                    className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white w-fit",
                        isActive && !isNavigationHovered && "bg-white border-primary"
                    )}>
                    {category.name}
                </Button>
                {category.subcategories && category.subcategories.length > 0 && (
                    <div className={cn(
                        "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2",
                        isOpen && "opacity-100"
                    )} />

                )}
                <SubCategoryMenu
                    category={category}
                    isOpen={isOpen}
                    position={dropdownPosition}
                />
            </div>

        </div>
    )
}

