import BulkNavbar from "../../components/BulkNavbar";
import { ScrollArea } from "@/components/ui/scroll-area";
export default async function BulkMessageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full flex flex-col h-full ">
            {/* <div className="h-[10%]"> */}
                {/* <BulkNavbar /> */}
            {/* </div> */}
            <div className="flex-1 h-full px-2">
                {children}
            </div>
        </div>
    )
}