import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { CustomerType } from "@/types"
import TemplateForm from './TemplateForm';

function CreateTemplate({customers}: CustomerType[]) {
  return (
    <div className="h-full flex flex-col space-y-2">
      <Heading
        title={"Template message campaign"}
        description={"Create a template type message campaign."}
      />
      <Separator/>
      <TemplateForm customers={customers}/>
    </div>
  )
}

export default CreateTemplate
