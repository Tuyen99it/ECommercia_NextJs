"use client"
// import { trpc } from "@/trpc/server";
// Imoport useQuery and useTRPC to query data
import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
import { json } from 'zod'
// Removed incorrect import of useTRPC
export default  function Home() {
  const trpc = useTRPC()
  // get session
  const {data} =useQuery(trpc.auth.session.queryOptions())

  return (
    <div >
    {JSON.stringify(data?.json,null,2)}
    </div>
  )
}
