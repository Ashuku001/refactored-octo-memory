import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface SidePanelProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
    side?: "top" | "bottom" | "left" | "right" | "bottomRight" | null | undefined,
    children?: React.ReactNode;
}

export const DrawerPanel: React.FC<SidePanelProps> = ({
    title,
    description,
    isOpen,
    onClose,
    className,
    side,
    children
}) => {
  const onChange = (open: boolean) => {
    if(!open){
        onClose();
    }
};

  return (
    <Drawer open={isOpen} onOpenChange={onChange}>
      <DrawerContent className="h-[600px] ">
        <div className="mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle className="text-center">{title}</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            {children}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
