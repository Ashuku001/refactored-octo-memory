
import { Customer360OrderObj, OrderItemType } from '@/types';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import { getGraphRevenue } from '@/app/actions/get-graph-data';

export interface OrderObj {
    orderID: string;
    isPaid: boolean;
    phone: string;
    address: string;
    store: string;
    totalPrice: string;
    products: string;
    orderItems: OrderItemType[];
    updatedAt: string;
}

export interface GraphOrderObj {
}

export const customer360OrderGroup = async (orders: Customer360OrderObj[], tabs: string[]) => {
    type TypedColumn = typeof tabs[number]
    interface Column {
        tab: TypedColumn;
        orders: OrderObj[];
    }
    interface Board {
        columns: Map<TypedColumn, Column>
    }
    
    // for graph data on customer value
    let confirmedOrders = []
    
    const columns = orders.reduce((acc, order) => {
        if(!acc.get(order.status)){
            acc.set(order.status, {
                tab: order.status,
                orders: []
            })
        }
        if(order.status === "CONFIRMED") {
            confirmedOrders = [...confirmedOrders, {
                createdAt: order.updatedAt,
                orderItems: order.orderItems
            }]
        }
        acc.get(order.status).orders.push({
            orderID: order.orderID,
            isPaid: order.isPaid,
            phone: order.phone,
            address: order.address,
            store: order?.storeOrder?.name,
            totalPrice: order?.orderItems ? order.orderItems?.reduce((total, orderItem)=> {
                return total + Number(orderItem!.price * orderItem!.quantity)
              }, 0) : 0,
            products: order?.orderItems?.map((orderItem) => orderItem?.orderProduct?.name).join(', '),
            orderItems: order?.orderItems?.reduce((acc, orderItem) => {
                acc.push({name: orderItem!.orderProduct.name, price: formatter.format(orderItem!.price), quantity: orderItem!.quantity, subtotal: formatter.format(Number(orderItem!.price * orderItem!.quantity))})
                return acc
              }, new Array<OrderItemType>),
            updatedAt: format(new Date(order?.updatedAt), "MMM do, yy"),
        })

     
        return acc 
    }, new Map<TypedColumn, Column>)

    const columnTypes: TypedColumn[] = tabs 
    for( const columnType of columnTypes){ 
        if(!columns.get(columnType)){
            columns.set(columnType, {
                tab: columnType,
                orders: [],
            });
        }
    };

    const entries = Array.from(columns)
    const groupedOrders: Column[] = entries?.map((column) => {return column[1]})

    const totalRevenue = groupedOrders.find((column) => column.tab === 'CONFIRMED').orders.reduce((total, order) => {
        return total + Number(order.totalPrice)
    }, 0)
    const abandonedCat = groupedOrders.find((column) => column.tab === 'PENDING').orders.reduce((total, order) => {
        return total + Number(order.totalPrice)
    }, 0)

    const graphRevenue = await getGraphRevenue(confirmedOrders)

    return {groupedOrders, totalRevenue, abandonedCat, graphRevenue}
}