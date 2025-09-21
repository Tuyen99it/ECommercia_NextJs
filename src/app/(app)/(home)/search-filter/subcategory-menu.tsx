
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import Link from "next/link";
// Define or import the Category type


interface Props {
    category: Category;
    isOpen: boolean;
    position: { top: number; left: number };
}

export const SubCategoryMenu = ({
    category,
    isOpen,
    position
}: Props) => {

    if (!isOpen || !category.subcategories || category.subcategories.length === 0) {
        return null;
    }
    const backgroundColor =  category.color||"#F5F5F5";
    return (
            <div className="fixed z-100"
                style={{
                    top: position.top,
                    left: position.left,
                }}>
                {/* invisible bridge to maintain  */}
                <div className="h-10 w-60"></div>
                <div
                    style={{ backgroundColor }}
                    className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,0,1)] -translate-x-[2px] -translate-y-[2px] ">

                    {
                        category.subcategories?.map((subcategory: Category) => (
                            <Link
                                key={subcategory.slug}
                                href="/"
                                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between">
                                    {subcategory.name}
                            </Link>
                        ))
                    }
                </div>
            </div>
    )
}

