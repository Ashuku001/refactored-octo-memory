import { storage } from "@/appwrite";
import { ActualFile } from "@/types";

export const getFileDownloadUrl = async (file: ActualFile) => {
    const url = await storage.getFileDownload(file.bucketId, file.fileId)

    console.log("PREVIEW URL",url)
    return url
}

export const getFilePreviewUrl = async (file: ActualFile) => {
    const url = await storage.getFilePreview(file.bucketId, file.fileId)

    console.log("PREVIEW URL",url)
    return url
}
