import Link from 'next/link'
import { headers } from 'next/headers'
 
export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get('host')
  return (
    <div>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/chats">all chats</Link>
      </p>
    </div>
  )
}