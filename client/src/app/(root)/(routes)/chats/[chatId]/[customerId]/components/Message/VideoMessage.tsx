import {  LegacyRef, RefObject, useRef, useState } from "react";
import { PlayCircleIcon, PauseCircleIcon, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
type Props = {
    video: {
        caption: string;
        url: string;
    }
}

function VideoMessage({ video }: Props) {
    const [isPlaying, setIsPlaying] = useState(false);
    const ref = useRef< LegacyRef<HTMLVideoElement> | undefined>(null);
  
    function handleClick() {
      const nextIsPlaying = !isPlaying;
      setIsPlaying(nextIsPlaying);
  
      if (nextIsPlaying) {
        //@ts-ignore
        ref.current?.play()!;
    } else {
          //@ts-ignore
        ref.current?.pause()!;
      }
    }

    return (
        <div className="relative">
                <div className="z-5 absolute top-2 right-2">
                    <Button onClick={() => handleClick()} type="button" variant={"ghost"} size={'icon'}>
                        {isPlaying ? <PauseCircleIcon className="h-20 w-20"/> : <PlayCircleIcon className="h-20 w-20"/>}
                    </Button>
                </div>
                <video
                    //@ts-ignore
                    ref={ref}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="object-cover rounded-md h-full  w-full"
                />
                    <source
                        src={video?.url}
                        type="video/mp4"
                    />
            <p className="p-2 break-words w-full">{video?.caption}</p>
        </div>
    )
}

export default VideoMessage
