import { DataTable } from "@/components/ui/DataTable";
import { SimilarProdColumns } from "./Columns";
import { SimilarProductFormatted } from "@/types";
import { Separator } from "@/components/ui/separator";

type Props = {
    columns: SimilarProductFormatted;
    formattedProducts: SimilarProdColumns;
}

export const SimilarProducts = ({
    columns,
    formattedProducts
}: Props) => {
  return (
    <>
        <Separator className="my-2"/>
        <div className="">
            <h1 className="font-semibold">Top 10 similar products</h1>
            <div className="bg-gradient-to-b  from-muted/20 to-muted/50 rounded-sm">
                <DataTable columns={columns} data={formattedProducts ?? []} searchKey="name" />
            </div>
        </div>
    </>)
};

