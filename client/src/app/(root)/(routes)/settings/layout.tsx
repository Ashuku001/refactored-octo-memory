import SettingsForm from "./components/SettingsForm";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full overflow-y-auto flex flex-row">
            <div className="left bg-[#ffffff] dark:bg-gray-800 h-full w-[350px] md:w-[500px] overflow-y-auto">
                <div className="sticky flex flex-col border-r border-slate-400 h-full">
                    <SettingsForm/>
                </div>
            </div>
            <div className="flex-1 flex flex-col bg-slate-300 dark:bg-[#020817] h-full">
                {children}
            </div>
        </div>
    )
}