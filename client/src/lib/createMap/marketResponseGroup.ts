
import { MarketResponseObj } from '@/types';

export interface ResponseObj {
    customerId: number; 
    name: string;
    phone: string;
    chatId: number;
    response: string;
}

export const getGroupedResponse = (responses: MarketResponseObj[], tabs: string[]) => {
    type TypedColumn = typeof tabs[number]
    interface Column {
        tab: TypedColumn;
        customers: ResponseObj[];
    }
    interface Board {
        columns: Map<TypedColumn, Column>
    }
    // // I will remove this one 
    // responses.push(  {
    //     customer: { id: 47, name: 'Carolyn', phone: '254779922410' },
    //     chatId: 223,
    //     response: 'Buy  909',
    //     createdAt: "787878878787"     
    // })

    const columns = responses.reduce((acc, response) => {
        if(tabs.includes(response.response)){
            if(!acc?.get(response.response)){
                acc?.set(response.response, {
                    tab: response.response,
                    customers: []
                })
            }

            let isDuplicate = false
            acc?.get(response.response)!.customers.forEach((customer) => {
                if(customer.phone === response.customer.phone){
                    isDuplicate = true
                } else {
                    isDuplicate = false
                }
            })

            if(!isDuplicate){
                acc?.get(response.response)!.customers.push({
                    customerId: response.customer.id,
                    phone: response.customer.phone,
                    name: response.customer.name,
                    chatId: response.chatId,
                    text: response.response,
                    createdAt: response.createdAt
                })
            }

        } else {
            if(!acc?.get("Inquiries")){
                tabs.push("Inquiries")

                acc?.set("Inquiries", {
                    tab: "Inquiries",
                    customers: []
                })
            }

         
            acc?.get("Inquiries")!.customers.push({
                customerId: response.customer.id,
                phone: response.customer.phone,
                name: response.customer.name,
                chatId: response.chatId,
                text: response.response,
                createdAt: response.createdAt
            })
        }
        return acc 
    }, new Map<TypedColumn, Column>)

    const columnTypes: TypedColumn[] = tabs 

    for( const columnType of columnTypes){ 
        if(!columns.get(columnType)){
            columns.set(columnType, {
                tab: columnType,
                customers: [],
            });
        }
    };

    const entries = Array.from(columns)

    const newColumns: string[] = entries?.map((column) => {return column[1]})
    return newColumns
}