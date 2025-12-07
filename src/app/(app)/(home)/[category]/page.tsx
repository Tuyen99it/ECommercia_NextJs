<<<<<<< HEAD
interface Props{
    params:Promise<{
        category:string;
        subcategory:string;
    }>
}
const Page= async ({params,}:Props)=>{
    const {category,subcategory} =await params;
    return (
        <div>
            Category page:{category}
        </div>
    )
}

// http:localhost:300/education
// http:localhost:300/[category]/[subcategory]
=======
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
>>>>>>> 10_CategoryPage
export default Page;