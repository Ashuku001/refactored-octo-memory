import { CouponObj } from "@/lib/createMap/PromotionsGroup"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import CardAction from "./CardAction"
import { DiscountFormatter } from "./DiscountFormatter"

type CouponCardsProps = {
    coupons: CouponObj[]
}
export const CouponCards = ({coupons}: CouponCardsProps) => {
    return (
        <div className="grid grid-gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 auto-cols-fr grid-flow-row">
            {coupons?.map((coupon) => <CouponCard key={coupon.id} coupon={coupon} />)}
        </div>
    )
}

type CouponCardProps = {
    coupon: CouponObj
}

const CouponCard = ({coupon}: CouponCardProps) => {
    return (
        <Card
            className="mx-1 my-1 p-1 hover:opacity-80 hover:cursor-pointer sm:w-[220px] lg:w-[220px] relative"
        >
        <CardHeader className="p-1">
            <CardTitle className="text-md font-semi-bold text-center">
                {coupon.coupon.code}
            </CardTitle>
            <CardDescription className="text-center text-sm text-muted-foreground">
                {coupon?.description}
            </CardDescription>
            <span className="absolute top-0 right-0">
                <CardAction data={coupon}/>
            </span>
        </CardHeader>
        <CardContent className=" p-1">
            <div className="flex items-center">
                <span className="w-12 text-muted-foreground">
                    From: 
                </span>
                <span className="flex-1">
                    {coupon.coupon.validFrom}
                </span>
            </div>
            <div className="flex items-center">
                <span className="w-12 text-muted-foreground">
                    To: 
                </span>
                <span className="flex-1">
                    {coupon.coupon.validTo}
                </span>
            </div>
        </CardContent>
        <CardFooter className=" p-1">
            <span className="w-12 text-muted-foreground">Value: </span>
            <span className="flex-1">
                <DiscountFormatter type={coupon.discountType} value={coupon.coupon.discount} />
            </span>
        </CardFooter>
    </Card>
    )
}