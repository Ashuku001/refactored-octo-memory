'use client'
import Link from "next/link"
import { usePathname, useParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { SearchInput } from "@/components/Search-Input"
import { AccordionCustom } from "@/components/AccordionCustom"


function SidePanel() {
    const [search, setSearch] = useState("")
    const pathname = usePathname()
    const params = useParams()
    const routes = [
        {
            group: "Memory filters",
            links: [
                {
                    href: `/${params.storeId}/ai/content-filter`,
                    label: `Content filter`,
                    active: pathname.includes(`/ai/content-filter`)
                },
                {
                    href: `/${params.storeId}/ai/collaborative-filter`,
                    label: `Collaborative filter`,
                    active: pathname.includes(`collaborative-filter`) ,
                },
            ]
        },
    ]
    return (
        <nav className={cn("flex flex-col px-1")}>
            <SearchInput placeholder="Search models" value={search} onValueChange={setSearch} className={"my-1"}/>
            {routes.map((group, i) =>
                <div key={i} className="">
                    <div className="text-muted-foreground px-1">{group.group}</div>
                    <div className="flex flex-col bg-muted/40 dark:bg-muted/20 space-y-1">
                        {group.links.map((route, i) => 
                            <Link
                                key={route.href}
                                href={route.href} 
                                className={cn("hover:bg-muted/80 dark:hover:bg-muted/50 px-1",
                                    route.active ? "bg-muted/70" : ""
                            )}>{route.label}</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default SidePanel
