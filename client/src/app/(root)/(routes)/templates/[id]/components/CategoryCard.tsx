import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils";

export type HeaderType = {title:string, icon:ReactNode}
export interface CategoryCardProps {
    head: HeaderType;
    description: string;
    children?: ReactNode;
    onClick?: () => void;
    className: string
}
export function CategoryCard({head, description, children, onClick, className}: CategoryCardProps) {
  return (
    <Card onClick={onClick}
        className={cn("hover:opacity-80 hover:cursor-pointer p-2", className)}
    >
        <div className="flex items-center ">
            <div className="rounded-full bg-muted-foreground/20 w-fit p-3">
                {head.icon}
            </div>
            <CardHeader className="flex-1 flex flex-col space-y-1">
                <CardTitle className="text-md font-bold ">
                    {head.title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </div>
        {children &&
            <CardContent>
                {children}
            </CardContent>
        }
    </Card>
  )
}

