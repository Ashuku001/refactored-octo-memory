'use client'
import { useRouter } from "next/navigation"
import { ResizableUI } from "@/components/ui/ResizableUI"
import { ArrowLeftIcon } from "lucide-react"
import EditTemplate from "./EditTemplate"
import { EditCategory } from "./EditCategory"
import { SampleLanguage } from "./SampleLanguage"
import { useCreateTemplateStore } from "@/store/useCreateTemplate"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"

function TemplateCreateForm() {
  const [next, setNext] = useCreateTemplateStore((state) => [state.next, state.setNext])
  const [submit, enableSubmit] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const router = useRouter()
  return (
    <div className="px-2 h-full">
      {next &&
          <div className="flex items-center justify-between py-1">
            <Heading title="Edit message template" description=""/>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant={'secondary'}
                className="flex items-center"
                onClick={() => {router.push("/templates/new");setNext(false)}}
              >
                <ArrowLeftIcon size="20"/>
                Back
              </Button>
              <HoverCard>
                <HoverCardTrigger className=''>
                  <Button
                      type="button"
                      disabled={!submit}
                      variant={'default'}
                      className="flex items-center"
                      onClick={() => {}}
                    >
                      Submit
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="p-0 w-[420px] h-60 max-h-[450px]">
                  <div>
                    {errors?.map((err, i) => {
                      <p key={i}>{err}</p>
                    })}
                  </div>
                </HoverCardContent>
              </HoverCard>
              <HoverCard>
                
              </HoverCard>    
            </div>
          </div>
      }
      <Separator />
      <ResizableUI
          sidebar={
            next ? <SampleLanguage />
                :  <EditCategory/>
          }
          content={
            next ?
            <EditTemplate enableSubmit={enableSubmit}/>
            : undefined
          }
          maxRightSize={90}
          minRightSize={80}
      />
    </div>
  )
}

export default TemplateCreateForm
