import { CustomerModal } from "@/components/modals/CustomerModal"

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full overflow-y-hidden flex flex-row">
            {children}
            <CustomerModal/>
        </div>
    )
}