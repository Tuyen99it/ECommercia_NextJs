import configPromise from '@payload-config'
import { getPayload } from 'payload'
export default  async function Home(){
   const payload =await getPayload({
    config:configPromise,
   })
   const data=await payload.find({
    collection:"categories",
    dept:1, //populate subcategories
    where:{
        parent:{
            exists:false,
        }
    }
   })
    return (
        <div >
        <p>Home Page</p>
        </div>
    )
}
