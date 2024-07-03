'use client'
import { GetCurrentMerchantDocument } from "@/graphql"
import { useSuspenseQuery } from "@apollo/client"

function MerchantsLogo() {
  const { data } = useSuspenseQuery(GetCurrentMerchantDocument)

  return (
    <div>
      <h1 className='font-semibold font-serif text-20'>{data?.currentMerchant?.business_name ? data?.currentMerchant?.business_name : data?.currentMerchant?.username}</h1>
    </div>
  )
}

export default MerchantsLogo