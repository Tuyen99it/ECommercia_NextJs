"use client";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation"; // next hook
import NavbarSideBar from "./navbar-sidebar";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
})
interface NavbarItemProps {
    children: React.ReactNode,
    isActive?: boolean,
}
const NavbarItem = ({
    href,
    children,
    isActive,
}: NavbarItemProps) => {
    return (
        <Button variant="outline" 
        className={ cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent  px-3.5 text-lg ", // cn: class name
        isActive &&"bg-black text-white")}>
           <Link href={href}>
            {children}
           </Link>
        </Button>
    );
}
const navbarItems = [
    { href: "/", children: "Home" },
    { href: "/about", children: "About" },
    { href: "/features", children: "Feature" },
    { href: "/pricing", children: "Pricing" },
    { href: "/contact", children: "Contact" },
]

const Navbar = () => {

    const pathname=usePathname(); // usePathname is the hook to get current path name, it is to active navItem when staying at Active page
    const [isSidebarOpen, setIsSidebarOpen] =useState(false);
    return (
        <div>
            <nav className="flex h-20 justify-between font-medium bg-white">
                <Link href="/" className="pl-6 flex place-items-center-safe">
                    <span className={cn("text-5xl font-semibold", poppins.className)}>
                        Funroand
                    </span>
                </Link>
                <NavbarSideBar
                items={navbarItems}
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}

                />
                <div className="items-center gap-4 hidden lg:flex">
                    {navbarItems.map((item) => (
                        <NavbarItem
                        key={item.href}
                            {...item}
                            isActive={pathname===item.href}
                        >
                            {item.children}
                        </NavbarItem>
                    ))}
                </div>
                <div className=" items-center gap-0 hidden lg:flex">
                    <Button variant="secondary"
                            className="border-l border-t-0 broder-b-0 px-12 rounded-none bg-white hoverL bg-pink-400 transition-colors text-lg">
                        Login
                    </Button>
                    <Button variant="secondary"
                            className="border-l border-t-0 broder-b-0 px-12 rounded-none bg-white hoverL bg-pink-400 transition-colors text-lg">
                        
                        Start selling
                    </Button>
                </div>
                <div className="flex lg:hidden items-center justify-center">
                    <Button variant="ghost"
                    className="size-12 border-transparent bg-white"
                    onClick={()=>setIsSidebarOpen(true)}>
                        <MenuIcon/>
                    </Button>
                </div>

            </nav>
        </div>
    );
};
export default Navbar;