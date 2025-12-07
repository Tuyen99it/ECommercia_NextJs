// create dynamic router for category
interface Props{
  params:Promise<{
    category:string;
    subcategory:string;
  }>
}   
const Page =async({params}:Props)=> {
  const {category,subcategory} =await params;

  return (
    <div >
 <p>  Category page :{category}</p>
    <p> Sub Category page :{subcategory}</p>
    </div>
  )
}
export default Page;