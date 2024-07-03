
import { Popover, PopoverTrigger, PopoverContent  } from "@/components/ui/popover";
import { Dispatch, SetStateAction, useState } from "react";

interface SearchPopoverProps {
    searchKeyOptions: string[]
    setSearchKey: Dispatch<SetStateAction<string>>
    searchKey: string;
}

interface KeyItemProps  {
    setSearchKey: Dispatch<SetStateAction<string>>
    isActive: boolean
    searchOption: string
    setOpen: Dispatch<SetStateAction<boolean>>
}

const KeyItem = ({ setSearchKey, searchOption, isActive, setOpen }: KeyItemProps) => (
    <div
        className={`'flex flex-row cursor-pointer font-bold b-1 rounded-sm p-1 ${isActive ? "bg-gray-800" : "bg-transparent"} hover:bg-gray-800`}
        onClick={() =>{
                setOpen(false)
                setSearchKey(searchOption)
            }
        }
    >
        <span>{searchOption}</span>
    </div>
);

function SearchPopover({searchKeyOptions, setSearchKey, searchKey}: SearchPopoverProps) {
    const [open, setOpen] = useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger className="flex space-x-2 items-center hover:bg-muted/50 p-1 rounded-sm border-2">
                <span>Select search by</span>
            </PopoverTrigger>
            <PopoverContent>
                <p className="text-md font-bold">
                    Search By:
                </p>
                <div  className='flex flex-col space-y-1'>
                    {searchKeyOptions.map((option) => (
                        <KeyItem
                            setOpen={setOpen}
                            searchOption={option}
                            isActive={searchKey === option}
                            setSearchKey={setSearchKey}
                            key={option}
                        />
                        ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default SearchPopover
