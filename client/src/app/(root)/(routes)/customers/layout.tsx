import SidePanelNav from "./components/SidePanelNav"
import CustomersList from "./components/CustomersList"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full overflow-y-hidden flex flex-row px-2">
            <div className="bg-[#ffffff] dark:bg-[#020817] h-full  w-[280px]">
                <div className="flex flex-col border-r h-full dark:border-slate-800 border-slate-300">
                    <SidePanelNav />
                    <hr className="h-[0.01px] bg-slate-100 dark:bg-gray-600"></hr>
                    <CustomersList />
                </div>
            </div>
            <div className="h-full flex-1">
                    {children}
            </div>
        </div>
    )
}