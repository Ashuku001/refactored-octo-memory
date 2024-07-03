import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface TipToolProps {
    tip: string;
    sideOffset: number;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
}
  
export const TipTool: React.FC<TipToolProps> = ({tip, onClick, children, sideOffset, className}) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button" className={className} onClick={onClick}>{children}</TooltipTrigger>
          <TooltipContent sideOffset={sideOffset}>
            {tip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
    )
}
  
  