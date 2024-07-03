export default async function SetupLayout({
    children
}: {
    children: React.ReactNode
}) {
    return(
        <div className="w-full h-full flex flex-row relative">
            {children}
        </div>
    )
}
