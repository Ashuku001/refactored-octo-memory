import { GetSettingDocument, GetSettingQuery } from "@/graphql"
import WebhookConfiguration from "./components/WebhookConfiguration"
import { SettingType } from "@/types"
import { getClient } from "@/lib/graphql/ApolloClient"
import SettingsForm from "./components/SettingsForm"

async function Page() {
  let setting: GetSettingQuery['setting'] | null = null
  try{

    const { data } = await getClient().query({
      query: GetSettingDocument
    })
    setting = data?.setting
  } catch(error){

  }


  return (
    <div className='flex flex-col  h-full'>
      <SettingsForm initialData={setting}/>
    </div>
  )
}

export default Page