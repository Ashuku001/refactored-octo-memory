import { Header } from "./SubComponents"

type MessageBodyProps = {
  children: React.ReactNode
}

export const MessageBody:React.FC<MessageBodyProps> = ({children}) => {
  return (
    <div className="p-1">
        <Header variant="required" title="Body" description="Enter text to your message" />
        <div className="mt-3">
          {children}
        </div>
    </div>
  )
}

