import { cn } from "@/utils/utils"
import { MouseEventHandler } from "react"

interface IconButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined,
    icon: React.ReactElement;
    className?: string;
}

function IconButton({
    onClick,
    icon,
    className
}: IconButtonProps) {
  return (
    <button
        onClick={onClick}
        className={cn(
            "rounded-full flex items-center justify-center shadow-md p-2 hover:scale-110 transition"
        )}
    >
      {icon}
    </button>
  )
}

export default IconButton
