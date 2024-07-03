// import { MessageConfigType, MessageInputType, OrderQuantityType, ProductType } from "@/types";


export function getTextMessageInput(recipient: string, text: string) {
    console.log("RECIPIENT PHONE NUMBER>>>>>>>>>>>..", recipient)
    return JSON.stringify({
        "messaging_product": "whatsapp",
        "preview_url": false,
        "recipient_type": "individual",
        "to": recipient,
        "type": "text",
        "text": {
            "body": text
        }
    });
}

const product = {
    name: "Coffee beans",
    thumbnail: {
        url: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }, 
    price: "2000",
    quantity: "30",
}

 {/* @ts-ignore */}
export function getTemplatedMessageInput(recipient:string, product) {
    return JSON.stringify({
        "messaging_product": "whatsapp",
        "to": recipient,
        "type": "template",
        "template": {
            "name": "new_arrival_product",  // from the selected template we have the name
            "language": {
                "code": "en_US"  // the template has a language
            },
            "components": [       // dynamically figure out this components
                {
                    "type": "header",
                    "parameters": [
                        {
                            "type": "image",
                            "image": {
                                "link": product.thumbnail.url
                            }
                        }
                    ]
                },
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": product.name
                        },
                        {
                            "type": "date_time",
                            "date_time": {
                                "fallback_value": product.price
                            }
                        },
                        {
                            "type": "text",
                            "text": product.quantity
                        }
                    ]
                }
            ]
        }
    }
    );
}



export function getTemplatedMessageInput2(recipient:string, product = {
    name: "Coffee beans",
    thumbnail: {
        url: "https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }, 
    price: "2000",
    quantity: "30",
}
) {
    return JSON.stringify({
        template: {
          name: 'buy_now_text_header',
          language: { code: 'en_US' },
          components: [ 
            {
                type: "header",
                parameters: [
                    {
                        type: "text",
                        text: "Ezra"
                    }
                ]
            },
            {
                type: "body",
                parameters: [
                    {
                        type: 'text',
                        text: "hello there"
                    }
                ]
            },
            {
                type: "button",
                parameters: [
                    {
                        type: 'COUPON_CODE',
                        text: "787878"
                    },
                    {
                        type: 'TEXT',
                        text: "https://something.come"
                    }
                ]
            }
        ]
        },
        to: '254707737397',
        messaging_product: 'whatsapp',
        type: 'template'
      }
    );
}

const nothing = "nothing"
export default nothing
