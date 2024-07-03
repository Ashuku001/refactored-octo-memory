'use client'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from 'react-hot-toast';
import * as z from "zod"
import { useMutation } from '@apollo/client';

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"

import { Input } from '@/components/ui/input'
import { AddImageMessageDocument, AddTextMessageDocument, GetChatDocument, AddDocumentMessageDocument, AddVideoMessageDocument } from '@/graphql'
import { SidePanel } from "@/components/ui/SidePanel";
import { useSendFileModal } from '@/hooks/useSendFileModal';
import { FileObj } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import {useFileStore} from '@/store/FileStore'
import { uploadFile } from '@/lib/appwrite/uploadFile';
import { FileTextIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMediaMessageObj } from '@/lib/generateTemplatePreview/getMediaMessageObj';

interface FilePanelProps {
    selectedFile: FileObj;
}
type PreviewObj = {
    file: any
}

export const SendFilePanel = ({selectedFile}: FilePanelProps) => {
    const sendFileModal = useSendFileModal()
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [documentPreview, setDocumentPreview] = useState(null);
    const [formSchema, setFormSchema] = useState(null)
    const [type, setType] = useState('Unsorported file type.') // for title
    
    const formSchemaRef = useRef(null)
    const templateDataRef = useRef(null)

    const params = useParams()

    const [file, setFile, addFile, filename, setFilename, fileType, setFileType, loadingFile, setLoadingFile] = useFileStore((state) => [
        state.file,
        state.setFile,
        state.addFile,
        state.filename,
        state.setFilename,
        state.fileType,
        state.setFileType,
        state.loadingFile,
        state.setLoadingFile,
    ])

    const [addImageMessage, { loading:addIML, error:addIME, data: addIMD }] = useMutation(AddImageMessageDocument)
    const [addTextMessage, { loading:addTML, error:addTME, data: addTMD }] = useMutation(AddTextMessageDocument)
    const [addDocumentMessage, { loading:addDML, error:addDME, data: addDMD }] = useMutation(AddDocumentMessageDocument)
    const [addVideoMessage, { loading:addVML, error:addVME, data: addVMD }] = useMutation(AddVideoMessageDocument)

    let validator = {}
    let initialData = {}

    useEffect(() => {
        if (selectedFile.file){
            if (selectedFile.type.includes("image")) {
                validator['caption'] = z.string().optional()
                initialData['caption'] = ''
                setImagePreview(selectedFile?.file);
                setType("Image")
                setFileType(selectedFile.type)
                templateDataRef.current = getMediaMessageObj('IMAGE')
            } else if (selectedFile.type.includes("video")) {
                validator['caption'] = z.string().optional()
                initialData['caption'] = ''
                setType("Video")
                setVideoPreview( selectedFile?.file);
                setFileType(selectedFile.type)
                templateDataRef.current = getMediaMessageObj('VIDEO')
            } else if(selectedFile.type.includes("application/pdf")){
                validator['caption'] = z.string().optional()
                initialData['caption'] = ''
                setType("Pdf document")
                setFileType(selectedFile.type)
                setDocumentPreview(selectedFile?.file);
                templateDataRef.current = getMediaMessageObj('DOCUMENT')
            } else if(selectedFile.type.includes("application/vnd.openxmlformats-officedocument.wordprocessingml.document")){
                validator['caption'] = z.string().optional()
                initialData['caption'] = ''
                setType("msWord document")
                setFileType(selectedFile.type)
                setDocumentPreview(selectedFile?.file);
                templateDataRef.current = getMediaMessageObj('DOCUMENT')
            }


            const formSchema = z.object({
                ...validator
            })

            formSchemaRef.current = formSchema

            setFile(selectedFile.fileObj)
            setFilename(selectedFile.fileObj.name)
        }

        return () => {
            setImagePreview( null)
            setDocumentPreview(null)
            setVideoPreview(null)
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile]);

    type TemplateMesFormValues = z.infer<typeof formSchemaRef.current>

    const form = useForm<TemplateMesFormValues>({
      resolver: zodResolver(formSchemaRef.current),
      defaultValues: initialData
    })

    const onSubmit = async (data: TemplateMesFormValues) => {
        if(!file) return
        setLoadingFile(true)

        const templateData = templateDataRef.current
        const fileUrl = await uploadFile(addFile, file)
        let variables = null
        let addMessage = {
            id: Math.round(Math.random() * -1000000),
            from_customer: false,
            timestamp: new Date(),
            createdAt: new Date(),
            chat: {
                __typename: "Chat",
                id: parseInt(params.chatId),
            },
            __typename: "Message"
        }
        let dummyMessage: {} = {hasContext: false, context :  null, image: null, document: null, text: null, interactive :  null, isAd :  null, mesBtnReply :  null, mesListReply :  null, mesTempReply :  null, messageAd :  null, messageId :  null, status :  null, video :  null,}
        let optimisticResponse: {} = {}
        let update: (data: {any}) => void
        let mutation = null
        let mutError = null

        if(type.includes('Image')){
            templateData.image.link = fileUrl,
            templateData.image.caption = data.caption ?? ""

            variables = {
                message: {
                    message: {
                        chatId: parseInt(params.chatId),
                        from_customer: false,
                        type: "IMAGE",
                        timestamp: new Date()
                    },
                    image: {
                        url: fileUrl,
                        caption: data.caption ?? ""
                    }
                },
                template: JSON.stringify(templateData)
            }
            mutation = addImageMessage
            addMessage = {
                ...addMessage,
                type: "IMAGE",
                image: {
                    __typename:  "ImageMessage",
                    url: fileUrl,
                    caption: data.caption ?? ""
                }
            }
            optimisticResponse = {
                addImageMessage: addMessage,
            }
            update = async (store, { data: { addImageMessage } }) => {
                let data = await store.readQuery({query: GetChatDocument, variables: {chatId: parseInt(params.chatId)}});
                const newMessage = { ...dummyMessage, ...addImageMessage}
                if(data?.chat?.messages?.slice(-1)[0]?.id !== addImageMessage.id){
                    data = {...data, chat: {
                        ...data?.chat,
                        messages: [...data?.chat?.messages!, newMessage]
                    }}
                    await store.writeQuery({ query: GetChatDocument, data, variables: {chatId: parseInt(params.chatId)}});
                }
            }
            mutError = addIME
        } else if(type.includes('document')){
            templateData.document.link = fileUrl,
            templateData.document.caption = data.caption
            templateData.document.filename = filename

            variables =  {
                message: {
                    message: {
                        chatId: parseInt(params.chatId),
                        from_customer: false,
                        type: "DOCUMENT",
                        timestamp: new Date()
                    },
                    document: {
                        url: fileUrl,
                        caption: data.caption ?? "",
                        filename: filename,
                        mimeType: fileType,
                    }
                },
                template: JSON.stringify(templateData)
            }
            mutation = addDocumentMessage
            addMessage = {
                ...addMessage,
                type: "DOCUMENT",
                document: {
                    __typename:  "DocumentMessage",
                    url: fileUrl,
                    caption: data.caption ?? "",
                    filename: filename,
                    mimeType: fileType,
                }
            }
            optimisticResponse = {
                addDocumentMessage: addMessage,
            }
            update = async (store, { data: { addDocumentMessage } }) => {
                let data = await store.readQuery({query: GetChatDocument, variables: {chatId: parseInt(params.chatId)}});
                const newMessage = { ...dummyMessage, ...addDocumentMessage}
                if(data?.chat?.messages?.slice(-1)[0]?.id !== addDocumentMessage.id){
                    data = {...data, chat: {
                        ...data?.chat,
                        messages: [...data?.chat?.messages!, newMessage]
                    }}
                    await store.writeQuery({ query: GetChatDocument, data, variables: {chatId: parseInt(params.chatId)}});
                }
            }
            mutError = addDME

        } else if(type.includes('Video')) {
            templateData.video.link = fileUrl,
            templateData.video.caption = data.caption
            variables =  {
                message: {
                    message: {
                        chatId: parseInt(params.chatId),
                        from_customer: false,
                        type: "VIDEO",
                        timestamp: new Date()
                    },
                    video: {
                        url: fileUrl,
                        caption: data.caption,
                        mimeType: fileType,
                    }
                },
                template: JSON.stringify(templateData)
            }
            mutation = addVideoMessage
            addMessage = {
                ...addMessage,
                type: "VIDEO",
                video: {
                    __typename:  "VideoMessage",
                    url: fileUrl,
                    caption: data.caption,
                    mimeType: fileType,
                }
            }
            optimisticResponse = {
                addVideoMessage: addMessage,
            }
            update = async (store, { data: { addVideoMessage } }) => {
                let data = await store.readQuery({query: GetChatDocument, variables: {chatId: parseInt(params.chatId)}});
                const newMessage = { ...dummyMessage, ...addVideoMessage}
                if(data?.chat?.messages?.slice(-1)[0]?.id !== addVideoMessage.id){
                    data = {...data, chat: {
                        ...data?.chat,
                        messages: [...data?.chat?.messages!, newMessage]
                    }}
                    await store.writeQuery({ query: GetChatDocument, data, variables: {chatId: parseInt(params.chatId)}});
                }
            }
            mutError = addVME
        }
  
        mutation({
            variables: variables,
            optimisticResponse: optimisticResponse,
            update: update
        }).then(() => {
            if(mutError){
                toast.error(`An error occured while sending ${type}. Try again later`)
            } else {
                toast.success(`Successfully sent ${type}.`)
            }
        })

        setLoadingFile(false)
        setFilename('')
        setFileType('')
        setFile(null)
        form.resetField("caption")
        sendFileModal.onClose()
    }
    return (
        <SidePanel
            title={`Send ${type}`}
            description=""
            isOpen={sendFileModal.isOpen}
            onClose={loadingFile ? sendFileModal.onOpen : sendFileModal.onClose}
            className='flex flex-col w-full lg:w-[70%] h-[620px] fixed bottom-0 mx-2 p-2'
            side='bottomRight'
        >
            <div className='h-full flex flex-col items-center justify-center'>
                {selectedFile.file &&
                <div className='h-[75vh] w-full flex items-center flex-col justify-center'>
                    {imagePreview &&
                    <>
                        <Image
                            src={imagePreview}
                            height={200}
                            width={200}
                            alt=""
                            className='cover max-h-[400px] w-auto rounded-lg'
                        />
                    </>
                    }
                    {videoPreview &&
                    <>
                        <video
                            src={videoPreview}
                            controls
                            className='cover w-[80%] max-h-[380px] rounded-lg'
                        />
                        <p className='text-slate-500 text-[12px]'>Size: {selectedFile.fileObj?.size}</p>
                    </>
                    }
                    {documentPreview &&
                        <div className='flex space-x-1 bg-slate-900/20 rounded-lg p-2 w-full'>
                            <FileTextIcon color={`${selectedFile.fileObj?.type === 'application/pdf' ?  'red' : 'blue'}`} className='h-10 w-10'/>
                            <div className='p-2 break-words w-full'>
                                <p className='line-clamp-3'>{selectedFile.fileObj?.name}</p>
                                <div className='flex justify-between items-center mt-3'>
                                    <p className='text-slate-500 text-[12px]'>{selectedFile.fileObj?.type === 'application/pdf' ? 'PDF' : 'DOCX'}</p>
                                    <p className='text-slate-500 text-[12px]'>Size: {selectedFile.fileObj?.size/1000000}MB</p>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                }

                <div className='flex-end mt-5 w-full h-20'> 
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="mb-2 flex">
                                <div className='flex-1'>
                                    <FormField
                                        control={form.control}
                                        name={'caption'}
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormControl>
                                                    <Input
                                                        autoComplete="do-not-autofill"
                                                        type={'text'}
                                                        name={'caption'}
                                                        onChange={() => field.onChange}
                                                        placeholder={"Add a caption"}
                                                        {...field}
                                                        className="bg-slate-200 dark:bg-gray-700 rounded-sm px-1 py-1 focus:border-none w-full pr-10 cursor-auto mb-2 "
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    disabled={!loadingFile && !selectedFile.file}
                                    type="submit"
                                    value='Send'
                                    className='inline-flex w-[100px] -ml-5 justify-center rounded-md rounded-l-none border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focust-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed px-auto py-auto'
                                >
                                    {loadingFile
                                        ? <LoadingSpinner/>
                                        : "Send"
                                    }
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </SidePanel>
    ) 
}