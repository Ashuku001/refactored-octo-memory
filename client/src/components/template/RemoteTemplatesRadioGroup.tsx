import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { useQuery } from '@apollo/client'
import { GetSettingDocument } from '@/graphql'
import { listTemplates } from '@/lib/message-helper/getRemoteTemplates'
import { SettingType } from '@/types'
import LoadingSpinner from '@/components/LoadingSpinner'
import { useSelectedTemplate } from '@/hooks/useSelectedTemplate';
import { useFormState } from '@/hooks/useFormResetValues';
import { useInteractiveTemplateStore } from '@/store/InteractiveTemplateStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import toast from 'react-hot-toast';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

type Props = {
    category: string
    template: {}
    setTemplate: Dispatch<SetStateAction<{}>>
}

function TemplateRadioGroup({ category, template, setTemplate }: Props) {
    const { data } = useSuspenseQuery(GetSettingDocument)
    const [remoteTemplates, setTemplates] = useState()
    const setting = data?.setting

    // reset form values on change of preview state
    const [form, defaultValues, setPreviewUrl] = useFormState((state) => [
        state.form,
        state.defaultValues,
        state.setPreviewUrl
    ])
    const [selectedTemplate, onSelectTemplate] = useSelectedTemplate((state) => [
        state.selectedTemplate,
        state.onSelectTemplate,
    ])

    const [loadingTemplate, setLoadingTemplate] = useInteractiveTemplateStore((state) => [
        state.loadingTemplate,
        state.setLoadingTemplate,
    ])

    let allTemplates = {}
    //@ts-ignore
    allTemplates["MARKETING"] = remoteTemplates?.filter((t) => t.category === 'MARKETING' && t.status === "APPROVED")
    //@ts-ignore
    allTemplates["UTILITY"] = remoteTemplates?.filter((t) => t.category === 'UTILITY' && t.status === "APPROVED")
    //@ts-ignore
    allTemplates["AUTHENTICATION"] = remoteTemplates?.filter((t) => t.category === 'AUTHENTICATION' && t.status === "APPROVED")
    //@ts-ignore
    const templates: string[] = allTemplates[`${category}`]


    useEffect(() => {
        const getTemplates = async () => {
            setLoadingTemplate(true)
            const result = await listTemplates(setting as SettingType)
            setTemplates(result)
            setLoadingTemplate(false)
            return
        }
        if(setting){ 
            getTemplates()
        }
        else {
            toast.error("Unable to retrieve your templates. Please ensure you have added your WhatsApp business setting from the settings page.", 
                        {
                            duration: 5000
                        })
        }
    }, [setLoadingTemplate, setting])

    return (
            <Command className='h-full'>
                <CommandInput placeholder=" Search for a template..." />
                {loadingTemplate
                    ? <div className='flex items-center min-h-40 justify-center h-full'>
                        <LoadingSpinner />
                    </div> 
                    :  
                    <CommandGroup className='border-none h-full'>
                        <CommandEmpty><div>No templates results</div></CommandEmpty>
                        <ScrollArea className="h-full w-full rounded-md min-h-40 p-4">
                            {
                                templates?.map((template, i) =>
                                    <CommandItem
                                        value={template}
                                        onSelect={() =>{
                                                form?.reset(defaultValues)
                                                onSelectTemplate(template.name)
                                                setPreviewUrl(null)
                                                setTemplate(template)
                                                // console.log("THE TEMPLATE WE ARE SETTING", template)
                                            }
                                        }
                                        key={i}
                                        className={`${selectedTemplate === template.name ? 'bg-slate-200 dark:bg-slate-900' : ''}`}
                                    >
                                        {template?.name?.replaceAll('_', ' ')}
                                    </CommandItem>
                                )
                            }
                        </ScrollArea>
                    </CommandGroup>
                }
            </Command>
    )
}

export default TemplateRadioGroup