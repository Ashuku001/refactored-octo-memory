import ChatList from "./components/ChatList"
import ChatSearchBar from "./components/ChatSearchBar"
import Uppernav from "./components/Uppernav"

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex flex-row px-2">
            <div className="bg-[#ffffff] dark:bg-[#09090B] w-[300px] md:w-[350px] h-full">
                <div className="flex flex-col border-r h-full dark:border-slate-800 border-slate-300">
                    <Uppernav />
                    <ChatSearchBar />
                    <hr className="h-[0.01px] bg-slate-100 dark:bg-gray-800"></hr>
                    <ChatList />
                </div>
            </div>
            <div className="flex-1 bg-slate-300 dark:bg-slate-800 h-full">
                {children}
            </div>
        </div>
    )
} 