import React from "react"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable"

  type ResizeableProps = {
    right?: React.ReactNode;
    center?: React.ReactNode;
    left?: React.ReactNode;
    maxSizeLeft?: number
    minSizeLeft?: number
    maxSizeRight?: number
    minSizeRight?: number
  }
  
  export function ClientResizable({
    left,
    right,
    maxSizeLeft,
    minSizeLeft,
    maxSizeRight,
    minSizeRight,
  }: ResizeableProps) {
    return (
        (
            <ResizablePanelGroup
              direction="horizontal"
              className="h-full rounded-lg border w-full"
            >
                  <ResizablePanel id="1" order={1} defaultSize={30} minSize={minSizeLeft} className="h-full">
                      {left}
                  </ResizablePanel>
                  {right &&
                  <>
                    <ResizableHandle withHandle/>
                    <ResizablePanel id="2" order={2} defaultSize={60}  minSize={minSizeRight}  className="h-full w-full animate-in animate-out">
                        {right}
                    </ResizablePanel>
                  </>
                  }
            </ResizablePanelGroup>
          )
    )
  }
  