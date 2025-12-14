"use client";
import { cn } from '@/lib/utils';
import { ChevronRightIcon, ChevronDownIcon } from 'lucide-react';
import { useState } from "react";
import { PriceFilter } from './price-filter';
import { useProductFilters } from '../../hooks/use-product-filter';
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

    // dynamic set value for filter hook, only accept minprice and maxprice with the name are key
    const onChange = (key: keyof typeof filters, value: unknown) => {
        setFilters({ ...filters, [key]: value })
    }
    return (
        <div className="border rounded-md bg-white ">
            <div className="px-4 border-b flex items-center justify-between">
                <p>Filter Product</p>
                <button className="text-sm text-blue-600" onClick={() => { }}>Reset</button>
            </div>
            <ProductFilter title='Price'>
                <PriceFilter
                    minPrice={filters.minPrice ?? undefined}
                    maxPrice={filters.maxPrice ?? undefined}
                    onMinPriceChange={(value)=> onChange("minPrice",value)}
                    onMaxPriceChange={(value)=>onChange("maxPrice",value)}
                />
            </ProductFilter>

        </div>
    )
}