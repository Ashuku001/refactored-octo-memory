import { GetStoreDocument } from "@/graphql";
import { redirect } from "next/navigation";
import Navbar from "./components/NavBar";
import { getClient } from "@/lib/graphql/ApolloClient";


export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    // check if user is logged in if not redirect to login page

    let store = null
    try{
        const {data} = await getClient().query({query: GetStoreDocument, variables: { storeId: parseInt(params.storeId)}})
        store = data?.store
    } catch(error){

    }


    // if no storeId was provided redirect to the root
    if (!store) {
        redirect('/')
    }

    return (
        <div className="w-full h-full  flex flex-row relative">
            <Navbar />
            <div className="h-full w-full ">
                    {children}
            </div>
        </div>
    )
}