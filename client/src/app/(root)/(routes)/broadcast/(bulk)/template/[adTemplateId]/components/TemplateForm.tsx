'use client'
import {useState, useEffect} from 'react';
import { useMutation } from '@apollo/client'
import { toast } from "react-hot-toast"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'


import { CustomerType } from "@/types"
import AdForm from "./AdForm"
import { AllCustomers } from "./AllCustomers"
import { AddTemplateCampaignDocument, AddBulkTemplateTaskDocument } from '@/graphql';
import { useForm } from 'react-hook-form';


const formSchema = z.object({
  sort: z.string().min().optional(),
  selectedCustomers: z.object({
    id: z.number(),
    phone_number: z.string(),
  }).array(),
  time: z.string().optional(),
  date: z.date().optional()
})

export type SelectedCustomerType = {id: number, phone_number: string}

export type TemplateAdFormvalue = z.infer<typeof formSchema>


function TemplateForm({customers}: CustomerType[]) {
  const [formTempData, setFormTempData] = useState(null)
  const [formTempVars, setFormTempVars] = useState(null)
  const [formMesVars, setFormMesVars] = useState<{ [key: string]: any; } | undefined>(undefined)
  const [addCampaign,{ loading, error }] = useMutation(AddTemplateCampaignDocument)
  const [addTempTaskSchedule] = useMutation(AddBulkTemplateTaskDocument)
  const defaultIds: SelectedCustomerType[] = []

  const initialData = {
    sort: "",
    selectedCustomers: defaultIds,
    time: "",
    date: new Date(),
  }

  const form = useForm<TemplateAdFormvalue>({
    resolver: zodResolver(formSchema),
    defaultValues:  initialData
  })

  
  const onSubmit = async (data: TemplateAdFormvalue) => {
    const time = data?.time
    const date = data?.date
    let schedule = undefined
    if(time && date){
      schedule = (new Date(date)).setHours(time)
    } 
    if(formTempData){
      const message = {
        message: {
          from_customer: false,
          type: "INTERACTIVE",
          timestamp: new Date()
        },
        interactive: formTempVars
      }
      const selectedCustomers= JSON.stringify(data.selectedCustomers)
      const template = JSON.stringify(formTempData)

      if(formTempVars){

        const variables = schedule 
          ? {
            schedule: {
                type: "bulkTemplate",
                status: "PENDING",
                timestamp: schedule,
                bulkTempTask: {
                    message: JSON.stringify(message),
                    template: template,
                    customers: selectedCustomers
                }
            }
          } 
          : {
            message: message,
            selectedCustomers: selectedCustomers,
            template: template
          }

        if(schedule){
          addTempTaskSchedule({variables})
        } else{
          addCampaign({ variables })
        }
      } else if(formMesVars) {
        // add a resolver to send messages without buttons
      }
    } else {
      toast.error("Choose a template before creating a campaign", {
        duration: 5000
      })
    }
  }



  return (
    <div className='flex flex-row h-full'>
        <div className='w-[70%] h-full'>
          <AdForm
            setFormMesVars={setFormMesVars}
            setFormTempVars={setFormTempVars}
            setFormTempData={setFormTempData}
          />
        </div>
        <div className='flex-1 h-full'>
          <AllCustomers 
            customers={customers} 
            form={form}
            onSubmit={onSubmit} 
            templateDataCheck={!formTempData || loading}
          />
        </div>
      </div>
  )
}

export default TemplateForm
