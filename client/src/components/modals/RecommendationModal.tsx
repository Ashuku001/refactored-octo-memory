'use client'

import * as z from "zod"

import { useRecommendationModal } from "@/hooks/useRecommendationModal"
import { Modal } from "@/components/ui/modal"
import { RecommendationOption } from "@/components/recommendation/RecommendationOptions"
import { useRecommendationStore } from "@/store/RecommendationStore"
import { useEffect, useState } from "react"
import { ContentFilter } from "../recommendation/ContentFilter"
import { CollaborativeFilter } from "../recommendation/CollaborativeFilter"

// the schema and the validation
const formSchema = z.object({
    name: z.string().min(3)
})

export const RecommendationModal = () => {
    const recommendationModal = useRecommendationModal()
    const [loading, setLoading] = useState(false)   
    const [option, setOption] = useRecommendationStore((state) => [state?.option, state.setOption])

    useEffect(() => {
        if(!recommendationModal.isOpen)
            setOption(undefined)
    }, [recommendationModal.isOpen, setOption])

    useEffect(() => {
        if(option == "content-filter"){
            setLoading(true)
        }
    }, [option])

    return (
        <Modal
            title="Recommendation"
            description="Select a recommendation model"
            isOpen={recommendationModal.isOpen}
            onClose={recommendationModal.onClose}
        >
            <div className="space-y-4 py-2 pb-4 h-45">
                {(!option)
                ?
                    <RecommendationOption />
                :
                    <div className="flex flex-col space-y-2 h-45">
                        {recommendationModal.data &&
                            <>
                                {option == "content-filter" && <ContentFilter setOption={setOption} data={recommendationModal.data} />}
                                {option == "collaborative-filter" && <CollaborativeFilter data={recommendationModal.data}/>}
                            </>
                        }
                    </div>
                }
            </div>
        </Modal>
    )
}

