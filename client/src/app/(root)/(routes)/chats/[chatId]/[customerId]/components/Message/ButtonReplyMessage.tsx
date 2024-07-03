import { ProductPreview } from '@/components/Message/ProductPreview';

type ButtonRepliedProps = {
    mesBtnReply: {
        id: number;
        title: string;
        buttonId: string;
        buttonReply: {
            product: {
                id: number;
                name: string;
                price: string;
                store: {
                    id: number;
                    name: string;
                }
            }
        }
    }
}



export const ButtonReplied = ({mesBtnReply}: ButtonRepliedProps) => {
    return (
        <>
            <ProductPreview product={mesBtnReply.buttonReply?.product} title="About product"/>
            <div className="m-0 p-1">
                {mesBtnReply?.title}
            </div>
        </>
    )
}


type TempRepliedProps = {
    mesTempReply: {
        id: number;
        text: string;
        tempReply: {
            tempProduct: {
                id: number;
                name: string;
                price: string;
                store: {
                    id: number;
                    name: string;
                }
            }
        }
    }
}

export const TemplateReplied = ({mesTempReply}: TempRepliedProps) => {
    return (
        <>
            <ProductPreview product={mesTempReply?.tempReply?.tempProduct} title="About product"/>
            <div className="m-0 p-1">
                {mesTempReply?.text}
            </div>
        </>
    )
}