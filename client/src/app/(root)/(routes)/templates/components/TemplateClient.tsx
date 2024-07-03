import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { PlusIcon } from "lucide-react"
import { useRouter } from "next/navigation"
type TemplateClientProps = {
    templates: any
}

function TemplatesClient({templates}: TemplateClientProps) {
    const router = useRouter()
    return (
        <div className="h-full">
            <div className="flex items-center justify-between px-2">
                <Heading
                    title={`Message templates (${templates?.length})`}
                    description="Manage templates in your WhatsApp business account"
                />
                <Button onClick={() => {
                    router.push(`/templates/new`)
                }}>
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
        </div>
    )
}

export default TemplatesClient
