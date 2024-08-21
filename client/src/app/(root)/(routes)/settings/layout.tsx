

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full  dark:bg-[#09090B]">
            {children}
        </div>
    )
}