import { BillboardType } from "@/types";
import Container from "@/components/ui/Container";

interface BillboardProps {
    data: BillboardType
}
const Billboard: React.FC<BillboardProps> = ({data}) => {

  return (
        <div className="p-4 md:p-6 lg:p-0 rounded-xl overflow-hidden sm:px-6 lg:px-8">
            <div 
                style={{backgroundImage: `url(${data?.imageUrl})`}}
                className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
            >
                <div className="h-full w-full flex flex-col items-center justify-center text-center gap-y-8">
                    <div className="text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs font-bold ">
                        {data.label}
                    </div>
                </div>
            </div>
        </div>
  );
};

export default Billboard;
