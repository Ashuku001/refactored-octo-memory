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
  
  export function ProductClientResizable({
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
              className="w-full  h-full rounded-sm border flex flex-row"
            >
                  <ResizablePanel id="1" order={1} defaultSize={15} minSize={minSizeLeft} className="h-full w-full">
                      {left}
                  </ResizablePanel>
                  {right &&
                  <>
                    <ResizableHandle withHandle/>
                    <ResizablePanel id="2" order={2}  minSize={minSizeRight}  className="h-full w-full">
                        {right}
                    </ResizablePanel>
                  </>
                  }
            </ResizablePanelGroup>
          )
    )
  }
  