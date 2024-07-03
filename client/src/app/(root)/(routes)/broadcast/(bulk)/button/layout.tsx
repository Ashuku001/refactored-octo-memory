import { ScrollArea } from "@/components/ui/scroll-area";

export default async function BulkMessageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full flex flex-col h-full">
            <div className="h-full">
                <ScrollArea className="h-full">
                    <div className="px-2 mb-20">
                        {children}
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}