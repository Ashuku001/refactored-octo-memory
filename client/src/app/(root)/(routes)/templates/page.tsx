'use client'
import { listTemplates } from '@/lib/message-helper/getRemoteTemplates'
import { useQuery } from '@apollo/client'
import { GetSettingDocument } from '@/graphql'
import { useEffect, useState } from 'react'
import { RemoteTemplateObj, SettingType } from '@/types'
import Template from './components/Template'
import TemplatesClient from './components/TemplateClient';

function MyTemplates(request: Request) {
  const { data, loading, error } = useQuery(GetSettingDocument)
  const [remoteTemplates, setTemplates] = useState<RemoteTemplateObj[]>([])

  const setting = data?.setting


  const approvedTemplates = remoteTemplates?.filter((t) => t.status === 'APPROVED')
  const appMarketingTemplates = approvedTemplates?.filter((t) => t.category === 'MARKETING')
  const appUtilitiyTemplates = approvedTemplates?.filter((t) => t.category === 'UTILITY')
  const appAuthenticationTemplates = approvedTemplates?.filter((t) => t.category === 'AUTHENTICATION')
  const inReviewTemplates = remoteTemplates?.filter((t) => t.status === 'PENDING')
  const rejectedTemplates = remoteTemplates?.filter((t) => t.status === 'REJECTED')


  useEffect(() => {
    const getTemplates = async () => {
      const result = await listTemplates(setting as SettingType)
      setTemplates(result)
      return
    }
    getTemplates()
  }, [loading, setting])


  return (
    <>
     <div className="flex-1 space-y-4 pt-1 w-full h-full">
       <TemplatesClient templates={remoteTemplates ? remoteTemplates : []} />
    </div>
    </>
  )
}

export default MyTemplates