import { DiscountObj } from "@/lib/createMap/PromotionsGroup"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CardAction from "./CardAction"
import { DiscountFormatter } from "./DiscountFormatter"

type DiscountCardsProps = {
    discounts: DiscountObj[]
}
export const DiscountCards = ({discounts}: DiscountCardsProps) => {
    return (
        <div className="grid grid-gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-cols-fr grid-flow-row">
            {discounts?.map((discount) => <DiscountCard key={discount.id} discount={discount} />)}
        </div>
    )
}

type DiscountCardProps = {
    discount: DiscountObj
}

const DiscountCard = ({discount}: DiscountCardProps) => {
    return (
        <Card
        className="mx-1 my-1 p-1 hover:scale-105 hover:cursor-pointer sm:w-[220px] lg:w-[220px] relative"
            >
            <CardHeader className="p-1">
                <CardTitle className="text-md font-semi-bold text-center">
                    {discount.discountType}
                </CardTitle>
                <CardDescription className="text-center text-sm text-muted-foreground h-10 break-words line-clamp-2">
                    {discount?.description}
                </CardDescription>
                <span className="absolute top-0 right-0">
                    <CardAction data={discount}/>
                </span>
            </CardHeader>
            <CardContent className=" p-1">
                <div className="flex items-center">
                    <span className="w-12 text-muted-foreground">
                        From: 
                    </span>
                    <span className="flex-1">
                        {discount.startDate}
                    </span>
                </div>
                <div className="flex items-center">
                    <span className="w-12 text-muted-foreground">
                        To: 
                    </span>
                    <span className="flex-1">
                        {discount.endDate}
                    </span>
                </div>
            </CardContent>
            <CardFooter className=" p-1">
                <span className="w-12 text-muted-foreground">Value: </span>
                <span className="flex-1">
                    <DiscountFormatter type={discount.discountType} value={discount.discountValue} />
                </span>
            </CardFooter>
        </Card>
    )
}