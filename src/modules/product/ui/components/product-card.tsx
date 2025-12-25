import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Star } from "lucide-react"
import { ProductGetOneOutput } from "@/modules/product/server/types"

interface Props {
  id: string;
  name: string;
  imageUrl?: string | null;
  authorUserName: string;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number
  price: number
}

export function ProductCard({
  id,
  name,
  imageUrl,
  authorUserName,
  authorImageUrl,
  reviewRating,
  reviewCount,
  price,
}: Props) {
  return (
    <Link href={`/product/${id}`}>
      <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={imageUrl ?? "/backgroundproduct.png"}
            className="object-cover"
          />
        </div>
        <div className="p-4 flex flex-col items-start justify-between flex-1 border-y">
          <h2 className="font-medium ">{name}</h2>
          <div className="flex items-center gap-2">
            <div className="relative w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
              <Image
                alt={authorUserName}
                fill
                src={authorImageUrl ?? "/backgrounduser.png"}
                className="object-cover"
              />
            </div>
            <span className="text-xs text-gray-600">{authorUserName}</span>
          </div>
          {reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <p>{reviewRating} ({reviewCount})</p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="py-2  px-4 border rounded-sm bg-pink-400 w-fit">
            <p className="text-black font-medium ">${price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
export const ProductCardSkeleton=()=>{
  return (
    <div className="w-full aspect-3/4 bg-neutral-200 rounded-lg animate-pulse"></div>
  )
}