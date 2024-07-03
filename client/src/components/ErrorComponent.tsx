import React from 'react'

type Props = {
    message: string
}
function ErrorComponent({message}: Props) {
  return (
    <div className='text-red-400'>An error occured {message}</div>
  )
}

export default ErrorComponent