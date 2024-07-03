import { ProductPreview } from "@/components/Message/ProductPreview";
type ListRepliedProps = {
    mesListReply: {
        id: number;
        title: string;
        buttonId: string;
        description: string;
        listReply: MesContextProductType
    }
}

export type MesContextProductType = {
    product: {
        name: string;
        price: string;
        store: {
            name: string;
        }
    }
}

export const ListReplied = ({mesListReply}: ListRepliedProps) => {
  return (
    <>
    <ProductPreview product={mesListReply.listReply?.product} title="About product"/>
    <div className="p-1">
        <p>{mesListReply.title}</p>
        <p>{mesListReply.description}</p>
    </div>
    </>
  )
}

