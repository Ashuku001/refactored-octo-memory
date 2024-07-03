'use client'
import { useMutation } from "@apollo/client"
import { AddSettingDocument } from "@/graphql"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"


function SettingsForm() {
  const [ACCESS_TOKEN, setACCESSTOKEN] = useState('')
  const [APP_ID, setAPP_ID] = useState('')
  const [APP_SECRET, setAPP_SECRET] = useState('')
  const [BUSINESS_ACCOUNT_ID, setBUSINESS_ACCOUNT_ID] = useState('')
  const [PHONE_NUMBER_ID, setPHONE_NUMBER_ID] = useState('')
  const [API_VERSION, setAPI_VERSION] = useState('')
  const [WEBHOOK_VERIFICATION_TOKEN, setWEBHOOK_VERIFICATION_TOKEN] = useState('')
  const [RECIPIENT_PHONE_NUMBER, setRECIPIENT_PHONE_NUMBER] = useState('')

  const router = useRouter()

  const [addSettings] = useMutation(AddSettingDocument)

  const addSettingToDB = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!ACCESS_TOKEN || !APP_ID || !APP_SECRET || !BUSINESS_ACCOUNT_ID || !API_VERSION || !WEBHOOK_VERIFICATION_TOKEN || !RECIPIENT_PHONE_NUMBER) {
      return
    }

    const variables = {
      setting: {
        callBack_url: "",
        ACCESS_TOKEN: ACCESS_TOKEN,
        APP_ID: APP_ID,
        APP_SECRET: APP_SECRET,
        BUSINESS_ACCOUNT_ID: BUSINESS_ACCOUNT_ID,
        PHONE_NUMBER_ID: PHONE_NUMBER_ID,
        API_VERSION: API_VERSION,
        WEBHOOK_VERIFICATION_TOKEN: WEBHOOK_VERIFICATION_TOKEN,
        RECIPIENT_PHONE_NUMBER: RECIPIENT_PHONE_NUMBER,
      }
    }

    addSettings({
      variables: variables
    })
    setACCESSTOKEN('')
    setAPP_ID('')
    setAPP_SECRET("")
    setAPP_SECRET("")
    setBUSINESS_ACCOUNT_ID("")
    setPHONE_NUMBER_ID("")
    setAPI_VERSION("")
    setWEBHOOK_VERIFICATION_TOKEN("")
    setRECIPIENT_PHONE_NUMBER("")


    router.push(`/settings/${RECIPIENT_PHONE_NUMBER}`)
  }

  return (
    <div className="p-2 ">
      <h1 className="text-[18px] py-2 font-sans font-bold">Your whatsapp business account settings</h1>
      <form onSubmit={addSettingToDB} className="max-w-3xl font-sans font-bold">
        <label htmlFor="ACCESS_TOKEN">Access Token</label>
        <input onChange={e => setACCESSTOKEN(e.target.value)} type="text" placeholder='Access Token' name='ACCESS_TOKEN' id="ACCESS_TOKEN" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
        <label htmlFor="APP_ID">App ID</label>
        <input onChange={e => setAPP_ID(e.target.value)} type="text" placeholder='App ID' name='APP_ID' id="APP_ID" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
        <label htmlFor="APP_SECRET">App Secret</label>
        <input onChange={e => setAPP_SECRET(e.target.value)} type="text" placeholder='App Secret' name='APP_SECRET' id="APP_SECRET" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
        <label htmlFor="BUSINESS_ACCOUNT_ID">Whatsapp Business Account ID</label>
        <input onChange={e => setBUSINESS_ACCOUNT_ID(e.target.value)} type="text" placeholder='Business account ID' name='BUSINESS_ACCOUNT_ID' id="BUSINESS_ACCOUNT_ID" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
        <label htmlFor="PHONE_NUMBER_ID">phone number ID</label>
        <input onChange={e => setPHONE_NUMBER_ID(e.target.value)} type="text" placeholder='phone number ID' name='PHONE_NUMBER_ID' id="PHONE_NUMBER_ID" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
        <label htmlFor="API_VERSION">API Version</label>
        <input onChange={e => setAPI_VERSION(e.target.value)} type="text" placeholder='API Version' name='API_VERSION' id="API_VERSION" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
        <label htmlFor="WEBHOOK_VERIFICATION_TOKEN">Webhook verify Token</label>
        <input onChange={e => setWEBHOOK_VERIFICATION_TOKEN(e.target.value)} type="text" placeholder='WebHook Verfication Token' name='WEBHOOK_VERIFICATION_TOKEN' id="WEBHOOK_VERIFICATION_TOKEN" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
        <label htmlFor="RECIPIENT_PHONE_NUMBER">Test phone number to confirm your settings</label>
        <input onChange={e => setRECIPIENT_PHONE_NUMBER(e.target.value)} type="text" placeholder='2547 07 000 000' name='RECIPIENT_PHONE_NUMBER' id="RECIPIENT_PHONE_NUMBER" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" required />
        <input type="submit" value="SUBMIT" name='' className="'bg-slate-300 dark:bg-gray-500 rounded-lg px-4 py-2 outline-none cursor-pointer" />
      </form>
    </div>
  )
}

export default SettingsForm