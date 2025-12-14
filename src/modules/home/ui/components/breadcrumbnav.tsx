import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Props {
  activeCategoryParam: string;
  activeSubCategoryParam: string;
}
export function BreadcrumbNav({ activeCategoryParam, activeSubCategoryParam }: Props) {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {activeCategoryParam && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${activeCategoryParam}`}>{activeCategoryParam}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {activeSubCategoryParam && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${activeCategoryParam}/${activeSubCategoryParam}`}>{activeSubCategoryParam}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </>

  )
}
