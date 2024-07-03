type ReplyProps = {
    message: {
        type: string;
        mesListReply?: {
            title: string
            description: string
            listReply: {
              product: {
                name: string
                price: string
              }
            }
          }
          mesBtnReply?: {
            title: string
            buttonReply: {
              product: {
                name: string
                price: string
              }
            }
          }
          mesTempReply?: {
            text: string
            tempReply: {
              product: {
                name: string
                price: string
              }
            }
          }
    }
}

function Reply({message}: ReplyProps) {
  return (
    <div >
      {message.type === "BUTTON_REPLY" && 
      <div className="line-clamp-1">{message?.mesBtnReply?.title}</div>
      }
      {message.type === "LIST_REPLY" && 
      <div className="line-clamp-1">{message?.mesListReply?.description}</div>
      }
      {message.type === "TEMP_REPLY" && 
      <div className="line-clamp-1">{message?.mesTempReply?.text}</div>
      }
    </div>
  )
}

export default Reply
