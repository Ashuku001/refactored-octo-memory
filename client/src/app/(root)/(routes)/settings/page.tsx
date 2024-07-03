import { GetSettingDocument } from "@/graphql"
import WebhookConfiguration from "./components/WebhookConfiguration"
import { SettingType } from "@/types"
import { getClient } from "@/lib/graphql/ApolloClient"

async function Page() {
  let setting = null
  try{

    const { data } = await getClient().query({
      query: GetSettingDocument
    })
    setting = data?.setting
  } catch(error){

  }

  return (
    <div className='flex flex-col items-center justify-center h-full px-2'>
      {setting
        ? <WebhookConfiguration setting={setting as SettingType} />
        : <>
          <p className='text-2xl text-center font-sans'>
            You need a webhook end point so that you can see conversations of your customers to you
          </p>
          <br />
          <p className='text-3xl text-center font-sans'>
            To get a webhook endpoint fill and submit the form
          </p>
        </>
      }

    </div>
  )
}

export default Page