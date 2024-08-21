"use server"

export const addSettingToDB = (e: FormData) => {
    const access_token = e.get("access_token")?.toString()
    const app_id = e.get("app_id")?.toString()
    const app_secret = e.get("app_secret")?.toString()
    const business_account_id = e.get("business_account_id")?.toString()
    const phone_number_id = e.get("phone_number_id")?.toString()
    const api_version = e.get("api_version")?.toString()
    const webhook_verification_token = e.get("webhook_verification_token")?.toString()
    const phone_number = e.get("phone_number")?.toString()

    if (!access_token || !app_id || !app_secret || !business_account_id || !api_version || !webhook_verification_token || !phone_number) {
        return
    }

    const variables = {
        setting: {
            callBack_url: "",
            access_token: access_token,
            app_id: app_id,
            app_secret: app_secret,
            business_account_id: business_account_id,
            phone_number_id: phone_number_id,
            api_version: api_version,
            webhook_verification_token: webhook_verification_token,
            phone_number: phone_number,
        }
    }

    return variables
}