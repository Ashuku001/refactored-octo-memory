import { databases } from "../../appwrite"
import { Asset, Column, TypedColumn } from "@/types"

export const getFilesGroupedByColumns = async() => {
    const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_FILES_COLLECTION_ID!
    )

    const files = data.documents

    const columns = files.reduce((acc, file) => {
        if(!acc.get(file.type)){
            acc.set(file.type, {
                id: file.type,
                files: []
            })
        }

        acc.get(file.type)!.files.push({
            $id: file.$id,
            $createdAt: file.$createdAt,
            name: file.name,
            type: file.type,
            ...(file.file && {file: JSON.parse(file.file)})
        })

        return acc;



    }, new Map<TypedColumn, Column>)

    const columnTypes: TypedColumn[] = ["IMAGE", "VIDEO", "DOCUMENT"]
    
    for( const columnType of columnTypes){
        if(!columns.get(columnType)){
            columns.set(columnType, {
                id: columnType,
                files: [],
            });
        }
    };

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => (
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(a[0])
        ))
    )

    
    const asset: Asset = {
        columns: sortedColumns
    }

    console.log(asset)
    return asset
    
}