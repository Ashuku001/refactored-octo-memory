import Image from "next/image"
type Props = {
    image: {
        caption: string;
        url: string;
    }
}

export function ImageMesContext({ image }: Props) {
    return (
        <div className="flex">
            <p className="p-2 break-words line-clamp-2 w-[80%]">{image?.caption}</p>
            <Image
                alt="Img"
                height={200}
                width={200}
                src={image?.url}
                className="object-cover rounded-sm h-[100px] w-[100px] flex-1 overflow-hidden"
            />
        </div>
    )
}

