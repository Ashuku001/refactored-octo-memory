'use client'
import { SettingType } from "@/types"

type Props = {
    setting: SettingType
}


function WebhookConfiguration({ setting }: Props) {
    
    return (
        <div>
            <div>
                <h1 className="text-center text-[18px]">
                    Callback URL
                </h1>
                <p className='text-[16px] font-sans underline  text-center'>
                    {setting?.callBack_url}
                </p>
            </div>
            <br />

            <div>
                <h1 className="text-center text-[18px]">
                    Verify Token
                </h1>
                <div>
                    <p className='text-[16px] font-sans underline'>
                        {setting?.WEBHOOK_VERIFICATION_TOKEN}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WebhookConfiguration