import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'
import { useState } from "react";
import { Button } from "react-day-picker";
import { ArrowLeftIcon } from "lucide-react"
import {OptionType} from "@/store/RecommendationStore"
import { onPredict } from "@/lib/recommend/content";
import { DataType } from "@/hooks/useRecommendationModal";

type Props = {
    setOption: (option?: OptionType) => void;
    data: DataType;
}

export const ContentFilter = ({setOption, data}: Props) => {
    const baseUrl = "/memory/content/tfidf/predict"
    const [similarity, setSimilarity] = useState("Cosine")
    const [loading, setLoading] = useState(false) 
    const similarityOptions = ["Cosine",  "Manhattan"]

    const onContinue = () => {
        setLoading(true)
        onPredict({
            similarity,
            storeId
        })
        setLoading(false)
    }

    return( 
    <div>
        <div className="flex flex-col space-y-2">
            <CustomFormLabel title="Similarity measure" description="A function that checks similarity of products. Defaults to Cosine" variant="required" />
            <Select
            onValueChange={(value) => setSimilarity(value)}
            value={similarity}
            defaultValue="Cosine"
            >
            <SelectTrigger className=' focus:ring-0 w-[350px]'>
                <SelectValue
                    placeholder="Select similarity"
                    className="font-bold"
                />
            </SelectTrigger>
            <SelectContent>
                {similarityOptions?.map((option) => (
                <SelectItem
                    key={option}
                    value={option}
                >
                    {option}</SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
        <div className="flex justify-end space-x-2">
            <Button 
                className=""
                type="button"
                disabled={loading}
                onClick={() => {setOption(undefined)}}
            >
                <ArrowLeftIcon size="20"/>
                Back
            </Button>
            <Button 
                className=""
                type="submit"
                form="form"
                disabled={loading}
            >
                Continue
            </Button>
        </div>
    </div>);
};

