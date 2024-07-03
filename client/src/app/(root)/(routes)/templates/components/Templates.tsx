'use client'
import { listTemplates } from '@/lib/message-helper/getRemoteTemplates'
import { useQuery } from '@apollo/client'
import { GetSettingDocument } from '@/graphql'
import { useEffect, useState } from 'react'
import { RemoteTemplateObj, SettingType } from '@/types'
import Template from './Template'

function MyTemplates(request: Request) {
  const { data, loading, error } = useQuery(GetSettingDocument)
  const [remoteTemplates, setTemplates] = useState<RemoteTemplateObj[]>()

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
    <form action={`${process.env.NEXT_PUBLIC_SERVER_API}/createTemplates`} method="post">
        <button className='bg-black text-white rounded-sm p-5'>createTemplate</button>
    </form>
      <div>
        <h1 className='text-2xl text-center'>Approved templates</h1>
        <hr className='w-[70%] my-3 bg-gray-300 dark:bg-gray-600' />
        <div className=' space-x-10'>
          <div>
            <h1 className='text-[20px] font-bold'>Marketing templates</h1>
            <hr className='w-[20%] my-2' />
            <div className='grid grid-cols-3'>
              {appMarketingTemplates?.map((template) => (
                <div key={template.id}>
                  <div>{template.name.replace('_', ' ')}</div>
                  <div className=' border border-gray-100 rounded-md max-w-[250px] md:max-w-[350px] h-auto p-2'>
                    <Template template={template} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className='text-[20px] font-bold'>Utility</h1>
            <hr className='w-[20%] my-2' />
            <div className='grid grid-cols-3 items-start'>
              {appUtilitiyTemplates?.map((template, i) => (
                <div key={template.id}>
                  <div>{template.name.replace('_', ' ')}</div>
                  <div className=' border border-gray-100 rounded-md max-w-[250px] md:max-w-[350px]  h-auto p-2'>
                    <Template template={template} />
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <h1 className='text-2xl text-center'>PENDING REVIEW</h1>
        <hr className='w-[70%] my-3 bg-gray-300 dark:bg-gray-600' />
        <div className='flex space-x-10'>
          <div className="grid grid-cols-3">
            <h1 className='text-[20px] font-bold'>Marketing templates</h1>
            <hr className='w-[20%] my-2' />
            <div className='grid grid-cols-3'>
              {inReviewTemplates?.map((template) => (
                <div key={template.id}>
                  <div>{template.name.replace('_', ' ')}</div>
                  <div className=' border border-gray-100 rounded-md max-w-[250px] md:max-w-[350px] h-auto p-2'>
                    <Template template={template} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <div>
        <h1 className='text-2xl'>Rejected templates</h1>
        <div className='text-red-300'>
          {rejectedTemplates?.map((t, i) => (
            <div key={t.id}>{t.name.replace('_', ' ')}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MyTemplates