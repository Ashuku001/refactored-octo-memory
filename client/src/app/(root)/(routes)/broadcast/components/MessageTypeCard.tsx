'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useRouter } from "next/navigation"

type MessagetTypeCardProps = {
    title: string,
    href: string,
    content: string,
}

function MessagetTypeCard({title, href, content}: MessagetTypeCardProps) { 
    const router = useRouter()
  return (
    <Card onClick={() => router.push(`/broadcast/${href}`)}
        className="hover:opacity-80 hover:cursor-pointer h-[300px] w-full"
    >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 w-full">
            <CardTitle className="text-md font-bold text-center w-full">
                {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className=" semi-bold text-center">
                {content}
            </div>
        </CardContent>
    </Card>
  )
}

export default MessagetTypeCard
