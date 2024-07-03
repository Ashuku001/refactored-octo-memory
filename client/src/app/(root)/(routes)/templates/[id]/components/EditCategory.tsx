import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon, MegaphoneIcon, BellIcon, KeyRoundIcon} from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import Heading from "@/components/ui/Heading";
import { LanguageType, useCreateTemplateStore } from "@/store/useCreateTemplate";
import { Button } from "@/components/ui/button";

import { Separator } from "@radix-ui/react-separator";
import { CategoryCard,  HeaderType } from "./CategoryCard";
import { Input } from "@/components/ui/input";
import { FormItem } from "@/components/ui/form";
import { CustomFormLabel } from "@/components/ui/CustomFormLabel";

interface CategoryType  {
  value: "MARKETING" | "UTILITY" | "AUTHENTICATION";
  head: HeaderType;
  description: string;
}

const categories: CategoryType[] =[
  {
    value: "MARKETING",
    head: {
      title: "Marketing",
      icon: <MegaphoneIcon size={"40"}/>
    },
    description: "Promotions or information about your business, products or services. Or any message that isn't utility or authentication.",
  },
  {
    value: "UTILITY",
    head: {
      title: "Utility",
      icon: <BellIcon size={"40"}/>
    },
    description: "Message about a specific transaction, account, order or customer request."
  },
  {
    value: "AUTHENTICATION",
    head: {
      title: "Authentication",
      icon: <KeyRoundIcon size={"40"}/>
    },
    description: "One time password your customers use to authenticate a transaction or login"
  },
]

const languages = [
  {
    title: "English (UK)",
    value: "en"
  },
  {
    title: "English (US)",
    value: "us"
  },
]

export const EditCategory = () => {
  const [disabled, setDisabled] = useState<boolean>(true)
  const router = useRouter()
  const [tempCategory, name, language, next, setCategory, setName, setLanguage, setNext] = useCreateTemplateStore((state) => [
    state.category,
    state.name,
    state.language,
    state.next,
    state.setCategory,
    state.setName,
    state.setLanguage,
    state.setNext,
  ])

  useEffect(() => {
    if(tempCategory.length && name.length && language){
      setDisabled(false)
    }
  }, [tempCategory, name, language, setNext])


  return (
  <div className="h-full relative">
    <div className="flex items-center justify-between sticky top-0 bg-muted/80 dark:bg-muted/50  px-2 py-1 shadow-sm dark:shadow-slate-500">
      <Heading title="New Message Template" description=""/>
      <div className="flex space-x-2">
        <Button
          type="button"
          variant={'secondary'}
          className="flex items-center"
          onClick={() => router.push("/templates")}
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          type='button'
          onClick={() => (setNext(true))}
          className='' >
              continue
              <ArrowRightIcon size={"20"}/>
        </Button>
      </div>
    </div>
    <Separator className="mb-1"/>
    <ScrollArea className="h-full">
      <div className="w-full flex items-center justify-center">
        <div className="w-[600px] flex flex-col space-y-3 ">
          <div className="bg-muted/30 px-10 py-2 flex flex-col space-y-2">
            <CustomFormLabel title="Category" description="Choose a category that best describes your message template."/>
            {categories.map((category, i) =>
              <CategoryCard
                key={i}
                head={category.head}
                description={category.description}
                onClick={() => setCategory(category.value)}
                className={category.value === tempCategory ? "bg-muted": ""}
              >
                {(category.head.title.includes("Marketing") && tempCategory === 'MARKETING') &&
                  <div>Children content</div>
                }
              </CategoryCard>
            )}
          </div>
          <FormItem className="bg-muted/30 px-10 py-2">
            <CustomFormLabel title="Name" description="Name your message template"/>
            <div className="flex items-center relative">
              <Input
                placeholder="Enter template name.."
                disabled={name.length >= 512}
                value={name}
                onChange={(e) => {
                  setName(e.target.value.replace(/\s/g, "_").toLowerCase())}
                }
                className="pr-20"
              />
              <span className="absolute right-2">
                {name.length}/512
              </span>
            </div>
          </FormItem>
          <FormItem className="bg-muted/30 px-10 py-2">
            <CustomFormLabel title="Languages" description="Choose languages for your message."/>
              <Select
                  onValueChange={(value) => setLanguage(languages.find((l) => l.value === value) as LanguageType)}
              >
                  <SelectTrigger className='focus:ring-0'>
                      <SelectValue
                          placeholder="Select language."
                      />
                  </SelectTrigger>
                  <SelectContent>
                  {languages?.map((language, i) => (
                      <SelectItem
                        key={i}
                        value={language.value}
                      >
                      {language.title}</SelectItem>
                  ))}
                  </SelectContent>
              </Select>
          </FormItem>
        </div>
      </div>
      <div className="mb-40"/>
    </ScrollArea>
  </div>
  )
};

