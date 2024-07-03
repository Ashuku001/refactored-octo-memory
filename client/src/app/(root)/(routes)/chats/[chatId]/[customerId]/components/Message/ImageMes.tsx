import Image from "next/image"
type Props = {
    image: {
        caption: string;
        url: string;
    }
}

function ImageMes({ image }: Props) {
    return (
        <div className="h-full w-full">
            <Image
                alt="Img"
                width={200}
                height={200}
                src={image?.url}
                className="object-contain w-full h-auto"
            />
            <p className="p-2 break-words w-full">{image?.caption}</p>
        </div>
    )
}

export default ImageMes
