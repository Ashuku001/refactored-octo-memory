import {create} from 'zustand'
import { Models } from 'appwrite';
import {ID, databases, storage } from "@/appwrite"

import { TypedColumn, Column, Asset, ActualFile } from '@/types';
import { getFilesGroupedByColumns } from '@/lib/getFIlesGroupedByColumns';
import createStorageFile from '@/lib/appwrite/createFileStorage';
type File = Models.File

export interface FileState {
    asset: Asset;
    filename: string;
    fileType: TypedColumn;
    file: File;
    loadingFile: Boolean;

    getAsset: () => void;

    setFilename: (name: string) => void;
    setFileType: (type: string) => void;
    setFile:(file: File) => void;
    setLoadingFile:(loadingFile: Boolean) => void;

    addFile: (name: string, type: TypedColumn, file?: File) => Models.File | undefined
}

export const useFileStore = create<FileState>((set) => ({
    asset: {
        columns: new Map<TypedColumn, Column>()
    },
    filename: '',
    fileType: '',
    file: null,
    loadingFile: false,

    getAsset: async () => {
        const asset = await getFilesGroupedByColumns()
        set({asset})
    },

    setFilename: (name: string) => {
        set({filename: name})
    },
    setFileType: (type: string) => {
        set({fileType: type})
    },
    setFile: (file: File) => {
        set({file: file})
    },
    setLoadingFile: (loadingFile: Boolean) => {
        set({loadingFile:loadingFile})
    },

    addFile: async (name: string, type: TypedColumn, file?: File) => {
        let actualFile: File | undefined

        // first upload the fileObj image, document, video
        if(file) {
            const fileUploaded = await createStorageFile(file);
            if (fileUploaded) {
                actualFile = {
                    bucketId: fileUploaded.bucketId,
                    fileId: fileUploaded.$id
                }
            }
        }

        // create an instance of the file parent of the uploaded file in the database
        const {$id} = await databases.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID!,
            process.env.NEXT_PUBLIC_FILES_COLLECTION_ID!,
            ID.unique(),
            {
                name: name,
                type: type,
                ...(actualFile && {file: JSON.stringify(actualFile)})
            }
        )

        // set({setFile: null});

        // add the task to the board
        set((state) => {
            const newColumns = new Map(state.asset.columns)
            const newFile: File = {
                $id,
                $createdAt: new Date().toISOString(),
                name: name,
                type: type,
                ...(file && {file: file})
            }

            // get the column of the given id
            const column = newColumns.get(type)

            // if a column does not exist create a new column and add the added to do inside
            if(!column) {
                newColumns.set(type, {
                    id: type,
                    files: [newFile]
                });
            } else {
                newColumns.get(file)?.files.push(newFile)
            }
            return {asset: {columns: newColumns}}
        })

        return {uploadedFile: actualFile}
    },
}))