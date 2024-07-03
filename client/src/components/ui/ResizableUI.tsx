import React from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

  type ResizeableProps = {
    sidebar: React.ReactNode;
    content?: React.ReactNode;
    maxRightSize?: number;
    minRightSize?: number;

  }
  
  export function ResizableUI({
    content,
    sidebar,
    maxRightSize = 60,
    minRightSize = 10,
  }: ResizeableProps) {
    return (
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full w-full rounded-md  "
      >
        <ResizablePanel id="1" order={1}  className="h-full ">
          {sidebar}
        </ResizablePanel>
        {content &&     
        <>
            <ResizableHandle withHandle />
            <ResizablePanel id="2" order={2} defaultSize={maxRightSize} maxSize={maxRightSize} minSize={minRightSize}  className="h-full">
                {content}
            </ResizablePanel>
        </>
      }
      </ResizablePanelGroup>
    )
  }
  