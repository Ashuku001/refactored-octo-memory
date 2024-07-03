import Text from "./text"
import ImageMes from "./Image"
import DocumentMes from "./Document"
import VideoMessage from './VideoMessage';
import InteractiveMessage from "./Interactive";
import Reply from "./Reply";
type Props = {
    lastMessage: any
}

function LastMessage({ lastMessage }: Props) {
    const type = lastMessage?.type
    return (
        <div className="text-[15px] text-left break-words text-slate-500 dark:text-slate-500 font-sans font-normal line-clamp flex-1 h-6">
            {type === 'TEXT' &&
                <Text text={lastMessage?.text?.body} />
            }
            {type === 'IMAGE' &&
                <ImageMes caption={lastMessage?.image?.caption} />
            }
            {type ==='DOCUMENT' &&
                <DocumentMes filename={lastMessage?.document?.filename} />
            }
            {type ==='VIDEO' &&
                <VideoMessage caption={lastMessage?.video?.caption} />
            }
            {type === "INTERACTIVE" &&
                <InteractiveMessage interactive={lastMessage.interactive} />
            }
            {(type === "BUTTON_REPLY" || type=== "LIST_REPLY" || type==="TEMP_REPLY") &&
                <Reply message={lastMessage} />
            }
        </div>
    )
}

export default LastMessage
