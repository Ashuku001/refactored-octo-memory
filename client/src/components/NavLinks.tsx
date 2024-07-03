'use client'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import Link from 'next/link'


function NavLinks() {
    const pathname = usePathname()
    const routes = [
        {
            href: `/ `,
            label: `home`,
            active: pathname === '/'
        },
        {
            href: `/chats`,
            label: `chats`,
            active: pathname.includes(`/chats`)
        },
        {
            href: `/broadcast`,
            label: `bulk messaging`,
            active: pathname.includes(`/broadcast`)
        },
        {
            href: `/assets`,
            label: `assets`,
            active: pathname.includes(`/assets`)
        },
        {
            href: `/customers`,
            label: `my customers`,
            active: pathname.includes(`/customers`)
        },
        {
            href: `/templates`,
            label: `my templates`,
            active: pathname.includes(`/templates`)
        },
        {
            href: `/settings`,
            label: `my settings`,
            active: pathname.includes(`/settings`)
        },
    ]

    return (
        <nav className={cn("")}>
            <div>
                {routes.map((route) => 
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn("navLink uppercase p-0",
                            route.active ? " underline decoration-orange-400/80" : "text-mutate-foreground"
                        )}
                    >{route.label}</Link>
                )}
            </div>
           
        </nav>
    )
}

export default NavLinks