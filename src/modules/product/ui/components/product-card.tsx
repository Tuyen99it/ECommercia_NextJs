import Image from "next/image"
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
import { ProductGetOneOutput } from "@/modules/product/server/types"

interface Props {
  product: ProductGetOneOutput
}

export function ProductCard({ product }: Props) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      {/* Product image */}
      <div className="relative aspect-square bg-muted">
        <Image
          src={product.images?.imageUrl ?? "/product1.png"}
          alt={product.name??"Product Image"}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader className="space-y-1">
        <CardTitle className="text-lg line-clamp-1">
          {product.name}
        </CardTitle>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="flex items-center justify-between">
        <span className="text-xl font-semibold">
          ${product.price}
        </span>

        <div className="flex items-center gap-2">
          <Label htmlFor="quantity" className="sr-only">
            Quantity
          </Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            defaultValue={1}
            className="w-20"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}