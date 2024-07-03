import { useInteractiveButtonStore } from "@/store/InteractiveButtonStore"
type BodyProps = {
  bodyText: string
}
export const PreviewBody = ({bodyText}: BodyProps) => {
  return (
    <div>
      {bodyText}
    </div>
  )
}

