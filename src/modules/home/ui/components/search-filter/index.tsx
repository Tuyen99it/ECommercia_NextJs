"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { useParams } from "next/navigation";

export const SearchFilters = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions()
  );

  const params = useParams();
  const activeCategoryParam = params.category as string | undefined;
  const activeSubCategoryParam = params.subcategory as string | undefined;

  const activeCategory =
    data?.json?.find((cat) => cat.slug === activeCategoryParam) || undefined;

  let activeColor = activeCategory?.color || "yellow";

  if (activeSubCategoryParam) {
    const activeSubCategory = activeCategory?.subcategories?.find(
      (sub) => sub.slug === activeSubCategoryParam
    );
    activeColor = activeSubCategory?.color || activeColor;
  }

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: activeColor }}
    >
      <SearchInput />
      <div className="hidden lg:block">
        <Categories />
      </div>
      {/* show breadcrumbs */}
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      <SearchInput  />
      <div className="hidden lg:block"></div>
    </div>
  );
};
