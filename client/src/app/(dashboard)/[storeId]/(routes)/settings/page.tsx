import { GetStoreDocument, GetMpesaDocument,  GetStripeDocument } from "@/graphql"
import { getClient } from "@/lib/graphql/ApolloClient"
import { redirect } from "next/navigation";
import SettingsForm from "./components/SettingsForm";

type Props = {
    params: {
        storeId: string
    }
}

async function SettingsPage({ params: { storeId } }: Props) {

    const { data } = await getClient().query({
        query: GetStoreDocument,
        variables: { storeId: parseInt(storeId) },
    });

    const store = data?.store;

    const { data: MpesaData } = await getClient().query({
        query: GetMpesaDocument,
        variables: { storeId: parseInt(storeId) },
    });

    const mpesa = MpesaData?.mpesa;

    const { data: StripeData } = await getClient().query({
        query: GetStripeDocument,
        variables: { storeId: parseInt(storeId) },
    });

    const stripe = StripeData?.stripe;
  


    if (!store) {
        redirect("/")
    }

    return (
        <div className="fleX-1 h-full space-y-4">
            <SettingsForm initialData={{store: store, mpesa: mpesa, stripe: stripe}} />
        </div>
    )
}

export default SettingsPage