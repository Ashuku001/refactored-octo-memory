'use client'

import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { TipTool } from "@/components/ui/TipTool";
import { SettingsIcon, ShoppingCartIcon, WalletCards, GiftIcon, BrainCircuitIcon, BoxesIcon, BarChart3Icon, PresentationIcon } from "lucide-react";

function MainNav({
    className,
    ...Props
}: React.HtmlHTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams()
    const routes = [
        // route to settings of a specific store
        {
            href: `/${params.storeId}`,
            label: 'Overview',
            icon: <BarChart3Icon size={"25"} />,
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            icon: <PresentationIcon size={"25"} />,
            active: pathname.includes(`billboards`)
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categories',
            icon: <BoxesIcon size={"25"} />,
            active: pathname.includes(`categories`)
        },
        // {
        //     href: `/${params.storeId}/sizes`,
        //     label: 'Sizes',
        //     icon: <SettingsIcon size={"25"} />,
        //     active: pathname === `/${params.storeId}/sizes`
        // },
        // {
        //     href: `/${params.storeId}/colors`,
        //     label: 'Colors',
        //     icon: <SettingsIcon size={"25"} className="text-slate-700 hover:text-slate-400"/>,
        //     active: pathname === `/${params.storeId}/colors`
        // },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            icon: <ShoppingCartIcon size={"25"} className=""/>,
            active: pathname.includes(`products`)
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            icon: <WalletCards size={"25"} className=""/>,
            active: pathname.includes(`orders`)
        },
        {
            href: `/${params.storeId}/promotions`,
            label: 'Promotion',
            icon: <GiftIcon size={"25"} className=""/>,
            active: pathname.includes(`promotions`)
        },
        {
            href: `/${params.storeId}/ai/`,
            label: 'AI models',
            icon: <BrainCircuitIcon size={"25"} className=""/>,
            active: pathname.includes(`ai`)
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Store Settings',
            icon: <SettingsIcon size={"25"} />,
            active: pathname.includes(`/${params.storeId}/settings`)
        }
    ]
    return (
        <nav className={cn("flex flex-col items-center space-y-2", className)}>
            {routes?.map((route) => (
                <Link
                    key={route.href}
                    href={route.href}
                >
                    <TipTool tip={route.label} sideOffset={3} 
                        className={cn(" text-sm font-medium transition-colors hover:text-primary",
                        route.active ? " text-primary dark:text-primary" : "text-mutate-foreground text-slate-500"
                    )}>
                        {route.icon}
                    </TipTool>
                </Link>
            ))}
        </nav>
    )
}

export default MainNav