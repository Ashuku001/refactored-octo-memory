// import { MessageInputType } from "../../../types"

export async function sendMessage(data: string){
    console.log('DATA IN sendMEssage()', data)
    const response = await fetch(`/api/sendWhatsappMessage`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
    })

    console.log('RESPONSE>>>>>>>> IN sendMessage()', response)
    return response
}