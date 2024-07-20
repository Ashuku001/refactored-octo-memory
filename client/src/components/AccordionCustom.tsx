import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import React from "react"

type Props = {
    trigger: string;
    children: React.ReactNode
}

export const AccordionCustom = ({children, trigger}: Props) => {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>{trigger}</AccordionTrigger>
                <AccordionContent>
                {children}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}