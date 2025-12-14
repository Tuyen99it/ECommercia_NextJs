import { ProductGetOneOutput } from "@/modules/product/server/types";
interface Props{
    product:ProductGetOneOutput,
}
export const ProductDetail=({product}:Props)=>{
    return (
        <div>
            <p>product</p>
        </div>
    )
}