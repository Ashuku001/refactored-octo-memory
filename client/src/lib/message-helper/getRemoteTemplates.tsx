import { SettingType } from "@/types"
export async function listTemplates(setting: SettingType){
    console.log("######## settings in listTemplates", setting)
    const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/get-remote-templates`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({setting})
    })

    let {data} = await res.json()

    if(data){
        return data.data
    } 
}