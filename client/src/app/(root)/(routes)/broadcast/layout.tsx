import SidePanelNav from "./components/SideNavPanel";


export default async function BulkMessageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full h-full flex flex-col overflow-hidden">
            <SidePanelNav/>
            {children}
        </div>
    )
}