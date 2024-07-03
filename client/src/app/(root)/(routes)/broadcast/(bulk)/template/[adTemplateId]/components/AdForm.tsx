'use client'
import React, { useState, useRef, Suspense} from 'react'
import { toast } from "react-hot-toast"
import { Models } from 'appwrite'

import { useFileStore } from '@/store/FileStore';
import TemplatePreview from '@/components/template/TemplatePreview'
import TemplateTabs from '@/components/template/RemoteTemplateTabs'
import { useInteractiveTemplateStore } from '@/store/InteractiveTemplateStore';
import { uploadFile } from '@/lib/appwrite/uploadFile';
import { formatTemplateDataForm } from '@/lib/generateTemplatePreview/formatTemplateDataForm';
import LoadingSpinner from '@/components/LoadingSpinner'
import { Button } from '@/components/ui/button';


interface AdFormProps  {
  setFormTempData: any;
  setFormTempVars: any;
  setFormMesVars: any;
}

const AdForm: React.FC<AdFormProps> = ({
  setFormTempData,
  setFormTempVars,
  setFormMesVars,
}) => {
  const [remTemplate, setRemTemplate] = useState({})
  const [fileObj, setFileObj] = useState<Models.File | null>(null)
  const messageRef = useRef('')

  const [ templateData, templateVariables, associatedProduct] = useInteractiveTemplateStore((state) => [
    state.tempData,
    state.tempVariables,
    state.product
  ])
  //@ts-ignore
  const [file, addFile, loadingFile, setLoadingFile] = useFileStore((state) => [
    state.file,
    state.addFile,
    state.loadingFile,
    state.setLoadingFile
  ])


  const onSubmitTempForm = async (data: any) => {
    setLoadingFile(true)
    let fileUrl: string | undefined = undefined
    if((data.imageUrl?.length || data.documentUrl?.length || data.videoUrl?.length) && fileObj){
        fileUrl = await uploadFile(addFile, fileObj)
    }
    let {newTemplateData, newTemplateVariables, messageVariables} = formatTemplateDataForm(
      { data,
        fileObj,
        templateVariables,
        templateData,
        fileUrl,
        messageRef: messageRef.current
    })

    if(associatedProduct?.id && newTemplateVariables){
      newTemplateVariables.template['productId'] = associatedProduct?.id
    }

    setFormTempData(newTemplateData)
    setFormTempVars(newTemplateVariables)
    setFormMesVars(messageVariables)
    toast.success("Your message template was created successfully and ready for campaign", {
      duration: 5000
    })
    setLoadingFile(false)
  }

  return (
    <div className='h-full'>
        <div className='flex flex-row overflow-hidden h-[80vh]'>
            <div className='w-[30%] h-full bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm'>
                <TemplateTabs setTemplate={setRemTemplate} template={remTemplate} />
            </div>
            <div className='h-full flex-1 px-5 relative'>
              <Suspense fallback={<div className=' flex justify-center h-40 items-center'><LoadingSpinner /></div>}>
                <div className='flex sticky top-0 justify-end bg-muted/80 dark:bg-muted/50 mb-1 px-4 rounded-md'>
                  <Button
                    disabled={loadingFile}
                    type='submit'
                    form="BulkMessageForm"
                    className=' dark:text-blue-900 dark:hover:bg-blue-200  hover:bg-blue-900 focus:outline-none ' >
                        {loadingFile ? <LoadingSpinner/> : "Save Template"}
                  </Button>
                </div>
                <TemplatePreview 
                  tempObj={remTemplate} 
                  onSubmit={onSubmitTempForm}
                  id={"BulkMessageForm"} 
                  messageRef={messageRef}
                  setFileObj={setFileObj}
                />
                <div className="mb-5"/>
              </Suspense>
            </div>
        </div>
    </div>
  )
}

export default AdForm