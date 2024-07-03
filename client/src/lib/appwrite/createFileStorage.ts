import {ID, storage} from '@/appwrite'
import { Models } from 'appwrite';
type File = Models.File

const createStorageFile = async (file: File) => {
    if(!file) return
    const fileUploaded = await storage.createFile(
        process.env.NEXT_PUBLIC_FILES_BUCKET_ID,
        ID.unique(),
        file
    )

    return fileUploaded
}

export default createStorageFile
