import { GetStoreDocument } from "@/graphql"
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

    if (!store) {
        redirect("/")
    }

    return (
        <div className="fleX-1 h-full space-y-4">
            <SettingsForm initialData={store} />
        </div>
    )
}

export default SettingsPage