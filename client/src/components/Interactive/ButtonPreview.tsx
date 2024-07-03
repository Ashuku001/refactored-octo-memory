import { ReplyButtonsType, useInteractiveButtonStore } from "@/store/InteractiveButtonStore"

export const ButtonPreview = () => {
    //@ts-ignore
    const [replyButtons, buttonText0, buttonText1, buttonText2] = useInteractiveButtonStore((state) => [
      state.replyButtons,
      state.buttonText0,
      state.buttonText1,
      state.buttonText2
    ])
  return (
      <div className={`flex ${(replyButtons?.length == 2) ? "items-center justify-between space-x-2" : "flex-col space-y-1"}`}>
        {replyButtons?.map((btn: ReplyButtonsType, index: number) => 
          <button
              key={index} disabled
              className="text-center h-10 text-blue-900 dark:text-blue-300  w-full dark:bg-green-800 bg-green-300/80 rounded-lg px-4 py-1 drop-shadow-lg"
          >
            {index == 0 
              ? buttonText0
              : index == 1 ? buttonText1
              : index == 2 ? buttonText2
              : ''}
          </button>
      )}
      </div>
  )
}

