import { useInteractiveListStore } from "@/store/InteractiveListStore"
import {PreviewHeader} from "./PreviewHeader"
import {PreviewBody} from "@/components/Interactive/PreviewBody"
import { ListIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ListSectionPreview } from "./SectionPreview"

export const MessagePreviewList = () => {
    //@ts-ignore
    const [headerType, footerText, bodyText, actionButtonText, sections] = useInteractiveListStore((state) => [
        state.headerType,
        state.footerText,
        state.bodyText,
        state.actionButtonText,
        state.sections
    ])

    return (
        <div>
            <div className={`flex flex-col h-fit w-auto min-w-[250px] max-w-[280px] lg:max-w-[450px] rounded-lg }`}>
                <div className={`w-full p-1 rounded-lg dark:bg-green-800 bg-green-300/80 rounded-tr-none`}>
                    <div>
                        {headerType !== "NONE" &&
                            <PreviewHeader type={headerType}/>
                        }
                        <PreviewBody bodyText={bodyText}/>
                        <p className="text-left text-[14px] text-slate-400 p-1 line-clamp-1">{footerText}</p>
                        <div className='flex justify-end items-center space-x-1 px-1'>
                            <p className={`text-[0.65rem] italic text-slate-400 line-clamp-1`}>12/20/2023, 8:13:03 PM</p>
                        </div>
                        <Button 
                            className="w-full flex space-x-2 text-blue-900  dark:text-blue-300 rounded-none font-semibold text-20 text-center" 
                            variant={'ghost'}
                        >
                            <ListIcon className="h-8 w-8"/>
                            <span>
                                {actionButtonText}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="bg-black/30 mt-3 overflow-y-auto w-full">
                <ListSectionPreview trigger={actionButtonText} sections={sections}/>
            </div>
        </div>
    )
}

