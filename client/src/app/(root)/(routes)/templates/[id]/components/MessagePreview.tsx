import { PreviewHeader, HeaderType} from './subComponents/PreviewHeader';
import { PreviewBody } from './subComponents/PreviewBody';
import { QuickReplyType, OptOutType, WhatsAppType, PhoneNumberType, UrlType, CopyCodeType  } from "@/store/useCreateTemplate";
import { PreviewButton } from './subComponents/PreviewButton';


type PreviewProps = {
    header: HeaderType;
    footer: string;
    body: string;
    buttons: (QuickReplyType | OptOutType
        | PhoneNumberType
        | UrlType
        | CopyCodeType
        | WhatsAppType)[];
}
export function MessagePreview({header, body, footer, buttons}: PreviewProps) {
  return (
    <div className={`flex flex-col h-fit w-auto min-w-[250px] max-w-[280px] lg:max-w-[450px] rounded-lg }`}>
        <div className={`w-full  rounded-lg dark:bg-green-800 bg-green-300/80 rounded-tr-none`}>
            <div className='p-1'>
                {(header?.type !== "NONE" && header) && <PreviewHeader header={header}/>}
                <PreviewBody bodyText={body}/>
                <p className="text-left text-[14px] text-slate-400 p-1 line-clamp-1">{footer}</p>
                <div className='flex justify-end items-center space-x-1 px-1'>
                    <p className={`text-[0.65rem] italic text-slate-400 line-clamp-1`}>12/20/2023, 8:13:03 PM</p>
                </div>
            </div>
            {buttons?.map((btn, index) => 
                <PreviewButton key={index} button={btn}/>
            )}
        </div> 
    </div>
  )
}

