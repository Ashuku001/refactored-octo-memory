
import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SearchPopover from "./SearchPopover";

export type FiltersTableState = {
    columnFilters: ColumnFiltersStateType
    globalFilter: any
  }
  
  export type ColumnFiltersStateType = ColumnFilterType[]
  
  export type ColumnFilterType = {
    id: string
    value: unknown
  }

type FilterType = {id: string, value:string}

type FilterProps = { 
    searchKey: string; 
    setSearchKey: Dispatch<SetStateAction<string>>;
    searchKeyOptions: string[];

    columnFilters: any; 
    setColumnFilters: any; 
}

// @ts-ignore
export const Filters = ({ columnFilters, setColumnFilters, searchKey, setSearchKey, searchKeyOptions }: FilterProps) => {
    const [taskName, setTaskName] = useState("");  // return the objects value whose id = task
    const onFilterChange = (id: string, value: string) =>
        setColumnFilters((prev: FilterType[]) =>
        prev
            .filter((f) => f.id !== id) // filter out the object whose id is not equal to passed id
            .concat({  // add the new object to the remaining objects whose id = id
                id,
                value,
            })
    );

    useEffect(() => {
        setTaskName(columnFilters?.find((f: FilterType) => f.id === searchKey)?.value || "")
    }, [columnFilters, searchKey])

    useEffect(() => {
        setTaskName("")
    }, [searchKey])

    console.log("^&^&^&^&^7",taskName)

    return (
        <div className="mb-3 flex space-x-3 items-center w-full">
            <div className="w-48 flex space-x-3 items-center relative">
                <SearchIcon size="20" className="absolute left-4"/>
                <Input
                    type="text"
                    placeholder={`Search by ${searchKey}`}
                    className="rounded-sm b-1 pl-8 "
                    value={taskName}   // value of the object with an id = task
                    onChange={(e) => onFilterChange(searchKey, e.target.value)}
                />
            </div>
            <SearchPopover 
                searchKeyOptions={searchKeyOptions}
                setSearchKey={setSearchKey}
                searchKey={searchKey}
            />
            {/* <FilterPopover
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
            /> */}
        </div>
    );
};
export default Filters;
