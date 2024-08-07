import { cn } from "@/lib/utils";

interface  Props {
    title: string;
    description: string;
    className?: string;
}
const Heading: React.FC<Props> = ({
    title,
    description,
    className
}) => {
  return (
    <div className="mt-0 ">
        <h2 className={cn("text-2xl font-bold tracking-tight", className)}>{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default Heading