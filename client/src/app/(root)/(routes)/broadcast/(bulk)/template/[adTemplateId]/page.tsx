import { getClient } from "@/lib/graphql/ApolloClient"
import { GetTempMarketResponseDocument, GetCustomersDocument } from "@/graphql"
import AdTemplateOverview from "./components/AdTemplateOverview"
import { CustomerType } from "@/types"
import CreateTemplate from './components/CreateTemplate';
import toast from 'react-hot-toast';

type Props = {
  params: {
    adTemplateId: string
  }
}

const page = async ({ params: { adTemplateId } }: Props) => {
  let adTemplate = null
  let customers
  if(adTemplateId === "new"){
    try{
        const { data } = await getClient().query({query: GetCustomersDocument})
        customers = data?.customers as CustomerType[]
    } catch(error){

    }
  }
  else {
    try {
      const { data } = await getClient().query({
        query: GetTempMarketResponseDocument,
        variables: { adTemplateId: parseInt(adTemplateId) }
      });
      adTemplate = data?.tempMarketResponse
    } catch (error : any) {
      toast.error("Something went wrong.")
    }
  }

  return (
    <div className="flex-1 space-y-4 pt-1 h-full w-full ">
      {(!adTemplate && adTemplateId === 'new') ? 
      <CreateTemplate customers={customers}/>
      : !adTemplate ? <div>Something went wrong</div> :
      // @ts-ignore
      <AdTemplateOverview adTemplate={adTemplate}/>
      }
    </div>
  )
}

export default page