'use client'
import {  Dispatch, SetStateAction, Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TemplateRadioGroup from './RemoteTemplatesRadioGroup'
import { ScrollArea } from '@/components/ui/scroll-area'
import LoadingSpinner from '@/components/LoadingSpinner'

const categories = ["MARKETING", "UTILITY", "AUTHENTICATION"]
type Props = {
    template: {};
    setTemplate: Dispatch<SetStateAction<{}>>;
}

function TemplateTabs({template, setTemplate}: Props) {

    return (
        <Tabs defaultValue={categories[0].toLowerCase()} className="h-full w-full flex flex-col relative">
            <TabsList>
                {categories?.map((category, i) => 
                <TabsTrigger
                    value={category.toLowerCase()}
                    key={i}
                >
                    {category.toLowerCase()}
                </TabsTrigger>
                )}
            </TabsList>
            <ScrollArea className='h-full relative'>
                {categories?.map((category, i) => (
                <TabsContent key={i} value={category.toLowerCase()} className={''}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <TemplateRadioGroup
                            category={category}
                            template={template}
                            setTemplate={setTemplate}
                        />
                    </Suspense>
                </TabsContent>
                ))}
            </ScrollArea>
        </Tabs>
    )
}

export default TemplateTabs


