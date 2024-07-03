import { useEffect } from "react";
import Image from "next/image";
import { useInteractiveListStore } from "@/store/InteractiveListStore";

type PreviewHeaderProps = {
    type: string;
}


export function PreviewHeader({type}: PreviewHeaderProps) {
  //@ts-ignore
  const [headerType, headerText, setHeaderText] = useInteractiveListStore((state) => [
    state.headerType,
    state.headerText,
    state.setHeaderText
  ])
  useEffect(() => {
    if(headerType==='NONE'){
      setHeaderText("")
    }
  }, [headerType, setHeaderText])
  return (
    <div className="min-h-4">
      {headerType === 'TEXT' && <p className="font-extrabold">{headerText}</p>}
    </div>
  )
}
