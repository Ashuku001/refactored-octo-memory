'use client'
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { cn } from "@/lib/utils"

function SidePanel() {
    const pathname = usePathname()
    const params = useParams()
    const routes = [
        {
            href: `/${params.storeId}/products/setup-guide`,
            label: `Setup guide`,
            active: pathname.includes(`/products/setup-guide`)
        },
        {
            href: `/${params.storeId}/products`,
            label: `Products`,
            active:(pathname.includes(`products`) && !pathname.includes(`products/api`) && !pathname.includes(`/products/setup-guide`))
        },
        // {
        //     href: `/categories`,
        //     label: `Categories`,
        //     active: pathname.includes(`categories`)
        // },
        {
            href: `/${params.storeId}/products/api`,
            label: `API Calls`,
            active: pathname.includes(`products/api`)
        }
    ]
    return (
        <nav className={cn("flex flex-col")}>
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
