import { Badge, BadgeProps } from "@/components/ui/badge"


interface HeaderProps {
    title: string;
    description: string;
    variant: "optional" | "required"
}

const textMap: Record<HeaderProps["variant"], string> = {
    optional: "Optional",
    required: "Required"
}

const variantMap: Record<HeaderProps["variant"], BadgeProps['variant']> = {
    optional: "secondary",
    required: "destructive"
}


export const Header: React.FC<HeaderProps> = ({title, description, variant}) => {
  return (
    <div className="font-sans">
        <div className="flex space-x-2">
            <h1 className="font-semibold">{title}</h1>
            <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
        </div>
        <p className="font-light text-slate-500 text-[14px]">{description}</p>
    </div>
  )
}

