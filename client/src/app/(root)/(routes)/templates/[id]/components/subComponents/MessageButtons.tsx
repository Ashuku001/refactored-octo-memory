
import { CustomFormLabel } from "@/components/ui/CustomFormLabel";
import Column from "./Column";

import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useCreateTemplateStore } from '@/store/useCreateTemplate';
import { ButtonSwitcherPopover } from "./ButtonSwitcher";

type MessageButtonsProps = {
}

export const MessageButtons:React.FC <MessageButtonsProps> = () => {

  const [buttonBoard, setBoardState] = useCreateTemplateStore((state) => [state.buttonBoard, state.setButtonBoardState])

  const handleDragEnd = (result: DropResult) => {
      const { destination, source, type} = result

      if(!destination) return

      // handle column drag
      if(type === 'column'){
          const entries = Array.from(buttonBoard.columns.entries()); // the columns into arrays
          const [removed] = entries.splice(source.index, 1) // cache the column being dragged
          entries.splice(destination.index, 0, removed) // push into the new column
          const rearrangedColumns = new Map(entries) // store to a new rearranged columns

          // keep everyhng in the buttonBoard but the columns becomes the rearranged columns
          setBoardState({
              ...buttonBoard, columns: rearrangedColumns
          })
      }

      // this is step is needed as the indexed are stored as numbers 0,1,2 etc instead of id;s with DnD library
      const columns = Array.from(buttonBoard.columns) // create a copy of the columns
      const startColIndex = columns[Number(source.droppableId)] // from here 
      const finishedColIndex = columns[Number(destination.droppableId)] // to this column

      const startCol = {
          id: startColIndex[0],
          buttons: startColIndex[1].buttons
      }

      const finishCol = {
          id: finishedColIndex[0],
          buttons: finishedColIndex[1].buttons
      }
  
      
      // 
      if(!startCol || !finishCol) return

      // if DnD in the same location
      if(source.index === destination.index && startCol === finishCol) return

      const newTodos = startCol.buttons
      const [todoMoved] = newTodos.splice(source.index, 1)

      if(startCol.id === finishCol.id){
          //same colum task drag
          newTodos.splice(destination.index, 0, todoMoved)
          const newCol = {
              id: startCol.id,
              buttons: newTodos
          }

          const newColumns = new Map(buttonBoard.columns);
          newColumns.set(startCol.id, newCol)

          setBoardState({...buttonBoard, columns: newColumns})
      } else {
          // dragging to another col
          // from this column
          const finishTodos = Array.from(finishCol.buttons);
          finishTodos.splice(destination.index, 0, todoMoved);

          const newColumns = new Map(buttonBoard.columns)
          const newCol = {
              id: startCol.id,
              buttons: newTodos,
          }

          newColumns.set(startCol.id, newCol); // from the start column
          newColumns.set(finishCol.id, { // to the second column
              id: finishCol.id,
              buttons: finishTodos
          })

          //update the DB
        //   updateTodo(todoMoved, finishCol.id)

          // setting the buttonBoard to the new updated columns
          setBoardState({...buttonBoard, columns: newColumns})
      }
  }

  return (
    <div className="p-1 relative">
      <CustomFormLabel 
            variant="optional" 
            title="Button" 
            description="Create buttons that let customers respond to your message or take action."
        />
        <div className="sticky top-0 bg-slate-200 dark:bg-black rounded-sm w-fit">
        <ButtonSwitcherPopover />
        </div>
      <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='buttonBoard' direction="vertical" type="row">
          {(provided) =>
              <div
                  className='mt-3 flex flex-col space-y-4'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
              >{
                  Array.from(buttonBoard.columns.entries()).map(([id, column], index) => 
                      <Column 
                          key={id}
                          id={id}
                          column={column}
                          index={index}
                      />
                  )
                  
              }
              {provided.placeholder}
              </div>
          }
          </Droppable>
      </DragDropContext>
    </div>
    )
}

