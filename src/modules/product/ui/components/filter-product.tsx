"use client";
import { cn } from '@/lib/utils';
import { ChevronRightIcon, ChevronDownIcon } from 'lucide-react';
import { useState, useEffect } from "react";
import { PriceFilter } from './price-filter';
import { useProductFilters } from '../../hooks/use-product-filter';
import { TagsFilter } from './tags-filter';
import { useQueryStates, parseAsString, parseAsInteger } from 'nuqs';

interface Props {
    title: string,
    className?: string,
    children?: React.ReactNode
}
export const ProductFilter = ({ title, className, children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;
    return (
        <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
            <div onClick={() => setIsOpen((current) => !current)} className="flex items-center justify-between cursor-pointer">
                <p className="font-medium">{title}</p>
                <Icon className="w-4 h-4" />
            </div>
            {isOpen && children}
        </div>

    )
}
export const ProductFilters = () => {
    const [filters, setFilters] = useProductFilters();
    useEffect(() => {
    }, [filters])

    const hasAnyFilters = Object.entries(filters ?? {}).some(([, value]) => {
        if (Array.isArray(value)) return value.length > 0
        if (typeof value === "string") return value !== ""
        return false
    })
    const onClear = () => {
        setFilters({
            sort: "curated",
            minPrice: "",
            maxPrice: "",
            tags: []
        })
    }

    // dynamic set value for filter hook, only accept minprice and maxprice with the name are key
    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }
    return (

        <div className="border rounded-md bg-white ">
            <div className="p-4 border-b flex items-center justify-between gap-y-2">
                <p className="font-medium gap-y-2">Filter Product</p>
                {hasAnyFilters && <button className="text-md underline text-black" onClick={onClear}>Reset</button>}
            </div>


            <ProductFilter title='Price'>
                <PriceFilter
                    minPrice={filters.minPrice ?? undefined}
                    maxPrice={filters.maxPrice ?? undefined}
                    onMinPriceChange={(value) => onChange("minPrice", value)}
                    onMaxPriceChange={(value) => onChange("maxPrice", value)}
                />
            </ProductFilter>
            <ProductFilter title='Tags'>
                <TagsFilter
                    value={filters.tags}
                    onChange={(value) => onChange("tags", value)}
                />
            </ProductFilter>

        </div>
    )
}