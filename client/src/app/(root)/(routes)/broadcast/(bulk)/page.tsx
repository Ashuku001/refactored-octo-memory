import MessagetTypeCard from "../components/MessageTypeCard"
import Heading from "@/components/ui/Heading"

function page() {
  const messageType = [
    {
      title: "Template message",
      href: "template",
      content: "Explain template type message"
    },
    {
      title: "Interactive list message",
      href: "list",
      content: "Explain template type message"
    },
    {
      title: "Interactive button message",
      href: "button",
      content: "Explain template type message"
    },
  ]


  return (
    <div className='flex flex-col h-full w-full '>
      <Heading title="Bulk message" description="Choose type of message to send" />
      <div className='grid grid-cols-3 gap-10 pt-2'>
        {messageType.map((type, i) => <MessagetTypeCard key ={i} title={type.title} content={type.content} href={type.href}/>)}
      </div>
    </div>
  )
}

export default page
