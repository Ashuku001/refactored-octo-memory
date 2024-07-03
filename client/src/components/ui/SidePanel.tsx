import {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
  } from '@/components/ui/sheet'
import { cn } from '@/lib/utils';

interface SidePanelProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    className: string;
    side: "top" | "bottom" | "left" | "right" | "bottomRight" | null | undefined,
    children?: React.ReactNode;
}

export const SidePanel: React.FC<SidePanelProps> = ({
    title,
    description,
    isOpen,
    onClose,
    className,
    side,
    children
}: SidePanelProps) => {
    const onChange = (open: boolean) => {
        if(!open){
            onClose();
        }
    };

    return(
        <Sheet open={isOpen} onOpenChange={onChange}>
            <SheetOverlay className='fixed inset-0 z-40 bg-black/20 backdrop-blur-0'>
            <SheetContent className={cn( className, 'z-50 pb-10 rounded-lg')} side={side}>
                <SheetHeader>
                    <SheetTitle className='text-center'>
                        {title}
                    </SheetTitle>
                    <SheetDescription className='text-center'>
                        {description}
                    </SheetDescription>
                </SheetHeader>
                <div className='w-full h-full'>
                    {children}
                </div>
            </SheetContent>
        </SheetOverlay>
        </Sheet>
    )
}