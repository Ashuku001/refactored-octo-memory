import { NextResponse } from 'next/server'
export async function POST(request: Request, res: Response) {
  // a request to get all the templates from that business account
  const { setting } = await request.json()
  let data
  if (setting) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/${setting.API_VERSION}/${setting.BUSINESS_ACCOUNT_ID}/message_templates`
        + '?limit=1000',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${setting.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )

      data = await res.json()
      // res.json()


    } catch (error) {
    }
  }

  return await NextResponse.json({ data })

}
