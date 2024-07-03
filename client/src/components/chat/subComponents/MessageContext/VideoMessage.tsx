import Image from "next/image"
type Props = {
    video: {
        caption: string;
        url: string;
    }
}

export function VideoMesContext({ video }: Props) {
    return (
        <div className="flex w-full">
            <p className="p-2 break-words line-clamp-2 w-[80%]">{video?.caption}</p>
            <video
                src={video?.url}
                className="object-cover ml-auto rounded-sm h-[100px] w-[100px]  flex-1"
            />
        </div>
    )
}
