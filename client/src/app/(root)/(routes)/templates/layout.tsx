

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex flex-col h-full overflow-y-hidden">
            <div className="w-full flex-1  flex flex-col h-full">
                {children}
            </div>
        </div>
    )
}