import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FlaskConicalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/LoadingSpinner"

type TrainingCardProps = {
    onTrain: () => void;
    training: boolean;
    title: string;
    description: string;
    btnTitle: string;
  }

export const TrainingCard = ({onTrain, training, title, description, btnTitle}: TrainingCardProps) => {
  return (
    <Card>
      <CardHeader className="">
        <div className="flex flex-row items-center space-x-5">
          <FlaskConicalIcon size={"30"} className="text-muted-foreground"/>
          <CardTitle className="text-md font-semibold">
            {title}
          </CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button disabled={training}  className="font-semibold min-w-50" onClick={() => {onTrain()}}>
          {training ? <LoadingSpinner /> : btnTitle}
        </Button>
      </CardContent>
      </Card>)
  }