import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type CustomerProps = {
    src: string,
    fallback: string
}

export function CustomerAvatar({src, fallback}: CustomerProps) {
return (
    <Avatar>
        <AvatarImage src={src} alt="" />
        <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
)
}
  