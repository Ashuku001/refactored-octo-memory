'use client'
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

function SidePanel() {
    const pathname = usePathname()
    const params = useParams()
    const routes = [
        {
            href: `/${params.storeId}/promotions/setup-guide`,
            label: `Setup guide`,
            active: pathname.includes(`/promotions/setup-guide`)
        },
        {
            href: `/${params.storeId}/promotions`,
            label: `All Promotions`,
            active:(pathname.includes(`promotions`) && !pathname.includes(`/promotions/setup-guide`))
        },
        {
            href: `/${params.storeId}/promotions/coupon`,
            label: `Coupons`,
            active: pathname.includes(`promotions/coupon`)
        },
        {
            href: `/${params.storeId}/promotions/discount`,
            label: `Discounts`,
            active: pathname.includes(`promotions/discount`)
        }
    ]
    return (
        <nav className={cn("flex flex-col min-w-[125px]")}>
                {routes.map((route) => 
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("hover:bg-muted/80 dark:hover:bg-muted/50 py-2 px-2",
                            route.active ? "bg-muted/80" : ""
                        )}
                    >{route.label}</Link>
                )}
        </nav>
    )
}

export default SidePanel
