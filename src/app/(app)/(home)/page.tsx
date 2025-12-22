

import TestNuqs from './testnnuqs';
import { SearchParams } from 'nuqs/server';
interface Props{
  searchParams: Promise<SearchParams>
}
const Page = async (searchParam:Props) => {

  return (
    <div>
      <TestNuqs />
    </div>
  )
}
export default Page;