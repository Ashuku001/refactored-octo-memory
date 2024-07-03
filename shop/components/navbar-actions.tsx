'use client'
import { ShoppingBag } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import { useCart } from "@/hooks/use-Cart-Store"
import { useRouter } from "next/navigation"

export const NavbarActions = () => {
    const [isMounted, setMounted] = useState(false)
    const cart = useCart();
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])
    if(!isMounted) {
        return null
    }
    return (
        <div className="ml-auto flex items-center gap-x-4">
            <Button
                onClick={() => {router.push('/cart')}}
                className="flex items-center rounded-full bg-black px-4 py-3">
                <ShoppingBag size={20} color='white'/>
                <span className="ml-2 text-sm font-medium text-white">
                    {cart.items.length}
                </span>
            </Button>
        </div>
    )
}