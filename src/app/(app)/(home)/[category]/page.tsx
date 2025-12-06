// create dynamic router for category

import { defaultColors } from "@payloadcms/richtext-lexical"

// localhost:3000/[category]/page
interface Props{
  params:Promise<{
    category:string
  }>
}
const Page =async({params}:Props)=> {
  const {category} =await params;

  return (
    <div >
    Category page :{category}
    </div>
  )
}
export default Page;