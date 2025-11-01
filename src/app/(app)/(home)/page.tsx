"use client"
// import { trpc } from "@/trpc/server";
// Imoport useQuery and useTRPC to query data
import { useQuery } from '@tanstack/react-query'
import { useTRPC } from '@/trpc/client'
// Removed incorrect import of useTRPC
export default  function Home() {
  const trpc = useTRPC()
  const categories =useQuery(trpc.categories.getMany.queryOptions())
  return (
    <div >
     Home
    </div>
  )
}
