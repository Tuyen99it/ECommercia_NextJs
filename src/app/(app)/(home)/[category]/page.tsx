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
export default Page;