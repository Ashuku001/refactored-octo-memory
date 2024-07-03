'use client'
import { cn } from "@/lib/utils"
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function MainNav({
    className,
    ...Props
}: React.HtmlHTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams()
    const routes = [
        // route to settings of a specific store
        {
            href: `${pathname}`,
            label: 'Overview',
            active: pathname === `${pathname}`
        },
        
    ]
    return (
        <nav className={cn("flex flex-col items-center space-x-4 lg:space-x-6 my-1", className)}>
            {routes?.map((route) => (
                <div key={route.href} className="hover:bg-accent hover:text-accent-foreground w-full p-2 rounded-md">
                    <Link
                        href={route.href}
                        className={cn("text-sm font-medium transition-colors hover:text-primary",
                            route.active ? "text-black dark:text-white" : "text-mutate-foreground"
                        )}
                    >{route.label}</Link>
                </div>
            ))}
        </nav>
    )
}

export default MainNav