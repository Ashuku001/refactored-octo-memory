import { DocMesContext } from './MessageContext/DocMesContext';
import { ImageMesContext } from './MessageContext/ImageMesContext';
import { InteractiveContext } from './MessageContext/InteractiveContext';
import { VideoMesContext } from './MessageContext/VideoMessage';
import { TextMesContext } from './MessageContext/TextMes';

type MessageContextProps = {
    context: any
    contextBy?: 'string'
}

function MessageContext({context, contextBy}: MessageContextProps) {

    return (
        <div  className='w-full items-center justify-center text-slate-300 h-15 bg-black/60 rounded-lg font-light' >
            <div className={`h-fit w-full  border-l-2 ${context?.from_customer ? "border-slate-300 dark:border-slate-800" : "dark:border-green-800 border-green-300/80"}`}>
                    {context?.type === 'TEXT' && <TextMesContext body={context?.text?.body} />}
                    {context?.type === 'IMAGE' && <ImageMesContext image={context?.image} />}
                    {context?.type === 'DOCUMENT' && <DocMesContext document={context?.document} />}
                    {context?.type === 'VIDEO' && <VideoMesContext video={context?.video} />}
                    
                    {context?.type === 'INTERACTIVE' && <InteractiveContext interactive={context?.interactive} contextBy={contextBy}/> }
            </div>
        </div>


    )
}

export default MessageContext