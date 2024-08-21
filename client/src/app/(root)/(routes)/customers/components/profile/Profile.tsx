
import { CusProfileCol, cusProfileCols } from "./Columns"
import { DataTableWOInput } from "@/components/ui/DataTableWOInput"

type ProfileProps = {
    profile: CusProfileCol
}

function Profile({profile}: ProfileProps) {
    const tableData = [profile]
    return (
        <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-lg" >
            <DataTableWOInput data={tableData} columns={cusProfileCols} searchKey=""/>
        </div>
    )
}

export default Profile
