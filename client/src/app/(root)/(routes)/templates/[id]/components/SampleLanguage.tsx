import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import { useCreateTemplateStore } from "@/store/useCreateTemplate";

export function SampleLanguage() {
  const [language, name, category] = useCreateTemplateStore((state) => [state.language, state.name, state.category])
  return (
    <div className="flex flex-col">
      <div>
        <div className="text-muted-foreground">
          <CustomFormLabel title={'language'} description=""/>
        </div>
        {language?.title}
      </div>
      <div>
        <div className="text-muted-foreground">
          <CustomFormLabel title={'Template name'} description=""/>
        </div>
          {name}
      </div>
      <div>
        <div className="text-muted-foreground">
          <CustomFormLabel title={'Template category'} description=""/>
        </div>
          {category[0]?.toUpperCase() + category?.substring(1)}
      </div>
    </div>
  )
}
