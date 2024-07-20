import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
    name: string;
}

export const ModelInsights = ({name}: Props) => {
  return (
    <div>
        <Card className="glassy h-[85vh]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-semibold text-2xl">
              Insight&apos;s about {name && name} model
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-5">
            <Card className="glassy">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Generated leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                </div>
              </CardContent>
            </Card>
            <Card className="glassy">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Usage 
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                </div>
              </CardContent>
            </Card>
            <Card className="glassy">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-md font-medium">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
  );
};

