import { Poppins } from "next/font/google"
import Link from "next/link"
import { cn } from "@/lib/utils"
const poppins=Poppins({
    subsets:['latin'],
    weight:["700"]
})
export const Footer=()=>{
    return (
        <footer className="h-20 forn-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center f-full px-4 lg:px-12">
                <p className="text-xl">Power by </p>
                <Link href="/">
                <span className={cn("text-2xl font-semibold ",poppins.className)}>
                    funround
                </span>
                </Link>
            </div>
        </footer>
    )
}