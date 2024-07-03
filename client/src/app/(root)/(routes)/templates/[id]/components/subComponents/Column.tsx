import { Todo, TypedColumn } from "@/types"
import { Draggable, Droppable } from "react-beautiful-dnd"
import TodoCard from "./TodoCard"
import { PlusIcon } from 'lucide-react';
import { CustomFormLabel } from '@/components/ui/CustomFormLabel';
import { BtnColomn } from '@/store/useCreateTemplate';
import { MessageButton } from './MessageButton';
import { TypedBtnColumn } from '@/store/useCreateTemplate';

export const revalidate = 1
export const dynamic = 'force-dynamic';

type Props = {
    id: TypedBtnColumn,
    column: BtnColomn,
    index: number
}

const idToColumnText: { [key in TypedColumn]: string } = {
    'callToAction': 'Call to action',
    'quickReply': 'Quick reply',
}

function Column({ id, column, index }: Props) {
    const buttons = column.buttons
    return (
        <>
            <Draggable draggableId={id} index={index}>
                {(provided) =>
                    <div {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        {/* add a droppable */}
                        <Droppable droppableId={index.toString()} type="card">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`border rounded-sm ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-muted/40 '}`}
                                >
                                    <div className="px-2 py-2">

                                        <CustomFormLabel title={idToColumnText[id]} description="" />
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                        {buttons?.map((btn, index) => {
                                            return(
                                            <Draggable
                                                key={index}
                                                draggableId={index.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <MessageButton button={btn} btnIndex={index} columnId={id}/>
                                                )}
                                            </Draggable>
                                        )})}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )
                            }
                        </Droppable>
                    </div>
                }
            </Draggable>
        </>
    )
}

export default Column