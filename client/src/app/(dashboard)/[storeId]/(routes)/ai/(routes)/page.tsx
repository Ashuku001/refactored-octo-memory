import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { WrenchIcon, ScaleIcon, PlaySquareIcon } from "lucide-react"

type Props = {
  params: {
    storeId: string
  }
}

export default async function ProductsPage({params: {storeId}}: Props) {
    return (
        <div className="w-full h-full py-2 px-2  bg-gradient-to-b  from-muted/20 to-muted/50">
          <h1 className="font-semibold py-2">Welcome to your store&apos;s modeling studio</h1>
          <div className="grid gap-4 grid-cols-3">
            <div className="bg-[url('/card-bg.png')] bg-cover rounded-lg">
              <Card className="drop-shadow-md backdrop-filter backdrop-blur-sm bg-opacity-30 dark:bg-black/30 h-full ">
                <CardHeader className="flex flex-row items-center space-x-5 space-y-0 pb-2">
                  <WrenchIcon size="30"/>
                  <CardTitle className="text-2xl font-medium text-muted-foreground">
                    Build and train
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="">
                    Build and train machine learning models on your store&apos;s products metadata and customer purchasing history and demographic characteristics.
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="bg-[url('/card-bg.png')] bg-cover rounded-lg">
              <Card className="drop-shadow-md backdrop-filter backdrop-blur-sm bg-opacity-30 dark:bg-black/30 h-full">
                  <CardHeader className="flex flex-row items-center space-x-5 space-y-0 pb-2">
                    <ScaleIcon size="30"/>
                    <CardTitle className="text-2xl font-medium text-muted-foreground">
                      Deploy and monitor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      Spin up models ready to give predictions and recommendations to increase sales for your store and explore your customer base.
                    </div>
                  </CardContent>
              </Card>
            </div>
            <div className="bg-[url('/card-bg.png')] bg-cover rounded-lg p-0 m-0">
              <Card className="drop-shadow-md backdrop-filter backdrop-blur-sm bg-opacity-30 dark:bg-black/30 h-full">
                <CardHeader className="flex flex-row items-center space-x-5 space-y-0 pb-2">
                  <PlaySquareIcon size="30"/>
                  <CardTitle className="text-2xl font-medium text-muted-foreground">
                    Learn more
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="">
                    Watch tutorials to learn more about modeling studio.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    )
}