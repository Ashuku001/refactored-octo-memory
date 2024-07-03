import { useInteractiveButtonStore } from "@/store/InteractiveButtonStore"
import {PreviewHeader} from "./PreviewHeader"
import { PreviewBody } from "./PreviewBody"
import { ButtonPreview } from "./ButtonPreview"
import { ProductPreview } from "@/components/Message/ProductPreview"
export const MessagePreviewButton = () => {
    //@ts-ignore
    const [headerType, footerText, replyButtons, bodyText, product] = useInteractiveButtonStore((state) => [
        state.headerType,
        state.footerText,
        state.replyButtons,
        state.bodyText,
        state.product
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
                </div>
            </div>
            <div className='mt-1'>
                {replyButtons?.length > 0 &&  <ButtonPreview/>}
            </div>
        </div>
        {product &&
        <div className="mt-5">
            <ProductPreview product={product}/>
        </div>
        }
    </div>
  )
}

