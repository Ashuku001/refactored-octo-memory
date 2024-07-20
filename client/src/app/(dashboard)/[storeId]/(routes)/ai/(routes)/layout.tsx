import SidePanel from "./components/SidePanel"
export default function RootLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <div className="w-full h-full flex flex-row space-x-1">
            <div className='w-[200px] h-full bg-muted/40 dark:bg-muted/20'>
                <SidePanel/>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    )
}