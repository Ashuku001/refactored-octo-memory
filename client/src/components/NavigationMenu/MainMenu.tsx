"use client"
import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {  DraftingCompassIcon } from "lucide-react"

const bulkMessaging: { title: string; href: string; description: string }[] = [
  {
    title: "Template message",
    href: "/broadcast/template",
    description:
      "Send business initiated conversation using Marketing, Utility or Authentication templates.",
  },
  {
    title: "Interactive list message",
    href: "/broadcast/list",
    description:
      "Send interactive list type messages to open chats.",
  },
  {
    title: "Interactive button message",
    href: "/broadcast/button",
    description:
      "Send interactive button message to open chats.",
  },
]

type MainMenuProps = {
    navigationClass: string
}
export function MainMenu({
    navigationClass
}: MainMenuProps) {
  return (
    <NavigationMenu className="">
      <NavigationMenuList className="">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), navigationClass)}>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end  bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <DraftingCompassIcon className="h-6 w-6" />
                    <div className="mb-2 mt-2 text-lg font-medium">
                      Hello Customer.io
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground text-center">
                      Successfully engage your customers through a platform that they love.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Get started with customer engage.
              </ListItem>
              <ListItem href="/docs/contact-us" title="contact us">
                To contact us
              </ListItem>
              <ListItem href="/docs/new-features" title="New features">
                New feature release and suggestions
              </ListItem>
              <ListItem href="/docs/bug-report" title="Bug report">
                Report bugs or erros to us
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navigationClass)}>
              Stores
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/chats" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navigationClass)}>
              Chats
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
        <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), navigationClass)}>Broadcast</NavigationMenuTrigger>
        <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {bulkMessaging.map((component) => (
                <Link
                    key={component.title} href={component.href}>
                    <ListItem
                        title={component.title}
                    >
                    {component.description}
                    </ListItem>
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/customers" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navigationClass)}>
              My customers
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/templates" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navigationClass)}>
              My templates
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), navigationClass)}>
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
