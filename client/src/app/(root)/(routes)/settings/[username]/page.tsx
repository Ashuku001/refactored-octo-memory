'use client'
import { GetSettingDocument } from "@/graphql"
import { useSuspenseQuery } from "@apollo/client"

type Props = {
  params: {
    username: string
  }
}

function page({ params: { username } }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useSuspenseQuery(GetSettingDocument)

  const setting = data.setting
  return (
    <div className='flex flex-col items-center justify-center h-full px-2'>
      <p className='text-2xl text-center font-sans'>
        use this callback URL and verification token to subscribe for webhooks in your whatsapp business account
      </p>
      <br />
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

export default page