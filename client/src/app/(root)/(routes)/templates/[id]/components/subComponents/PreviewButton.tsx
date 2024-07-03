import {  ArrowUpRightSquare, PhoneIcon, ReplyIcon, CopyIcon  } from "lucide-react";

import { QuickReplyType, OptOutType, WhatsAppType, PhoneNumberType, UrlType, CopyCodeType  } from "@/store/useCreateTemplate";
import { ReactNode } from "react";
type ButtonPrevieProps = {
  button: QuickReplyType | OptOutType | PhoneNumberType | UrlType | CopyCodeType | WhatsAppType
}
export const PreviewButton = ({button}: ButtonPrevieProps) => {
    return (
      <div>
        {button?.type == "COPY_CODE" && <Button text={button.text} icon={<CopyIcon size="20"/>}/>}
        {button?.type == "QUICK_REPLY" && <Button text={button.text} icon={<ReplyIcon size="20"/>}/>}
        {button?.type == "PHONE_NUMBER" && <Button text={button.text} icon={<PhoneIcon size="20"/>}/>}
        {button?.type == "URL" && <Button text={button.text} icon={<ArrowUpRightSquare size="20"/>}/>}
        {button?.type == "WHATSAPP" && <Button text={button.text} icon={<PhoneIcon size="20"/>}/>}
        {button?.type == "OPT_OUT" && <Button text={button.text} icon={<ArrowUpRightSquare size="20"/>}/>}
      </div>
    )
  }

  type UrlButtonProps = {
    text: string
    icon: ReactNode
  }

  const Button = ({text, icon}: UrlButtonProps) => {
    return (
      <div className="flex items-center justify-center space-x-2 py-2 border-t border-slate-400 dark:border-slate-700 ">
        {icon}
        <span>{text}</span>
      </div>
    )
  }