import Image from "next/image"
type Props = {
    image: {
        caption: string;
        url: string;
    }
}

function ImageMes({ image }: Props) {
    return (
        <div>
            <Image
                alt="Img"
                width={200}
                height={200}
                src={image?.url}
                className="object-cover rounded-md h-[200px] aspect-[2.4/1]  w-full"
            />
            <p className="p-2 break-words w-full">{image?.caption}</p>
        </div>
    )
}

export default ImageMes
