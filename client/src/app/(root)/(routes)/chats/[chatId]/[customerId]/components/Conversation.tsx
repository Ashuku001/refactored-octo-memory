import React from 'react'
type Props = {
    category?: string | null | undefined;
    status?: string | null | undefined;
    pricingModel?: string | null | undefined;
    expiryDate?: any;
}
function Conversation({category, status, pricingModel, expiryDate}: Props) {
  return (
    <div className='mx-auto flex items-center space-x-2 text-green-300'>
        <p>{category} conversation</p>
        <p>{status} for</p>
        {/* have a timeout here */}
        <p>{expiryDate}</p>
    </div>
  )
}

export default Conversation
