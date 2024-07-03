"use server"

export const addSettingToDB = (e: FormData) => {
    const ACCESS_TOKEN = e.get("ACCESS_TOKEN")?.toString()
    const APP_ID = e.get("APP_ID")?.toString()
    const APP_SECRET = e.get("APP_SECRET")?.toString()
    const BUSINESS_ACCOUNT_ID = e.get("BUSINESS_ACCOUNT_ID")?.toString()
    const PHONE_NUMBER_ID = e.get("PHONE_NUMBER_ID")?.toString()
    const API_VERSION = e.get("API_VERSION")?.toString()
    const WEBHOOK_VERIFICATION_TOKEN = e.get("WEBHOOK_VERIFICATION_TOKEN")?.toString()
    const RECIPIENT_PHONE_NUMBER = e.get("RECIPIENT_PHONE_NUMBER")?.toString()

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

    return variables
}