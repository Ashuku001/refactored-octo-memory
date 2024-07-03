import { getFileDownloadUrl } from "./getFileUrl";
import { Models } from 'appwrite';

export const uploadFile = async (addFile: any, fileObj: Models.File) => {

    const {uploadedFile} = await addFile(fileObj.name, "IMAGE", fileObj)
    let fileUrl: any = await getFileDownloadUrl(uploadedFile)
    fileUrl = fileUrl.toString()

    return fileUrl
}