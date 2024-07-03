import { FilterIcon } from "lucide-react";
import { ColorIcon } from "./StatusCell";
import { Popover, PopoverTrigger, PopoverContent  } from "@/components/ui/popover";
import { Button } from "../ui/button";

const STATUS_ON_DECK = { id: 1, name: "On Deck", color: "blue-300" };
const STATUS_IN_PROGRESS = {
  id: 2,
  name: "In Progress",
  color: "yellow-400",
};
const STATUS_TESTING = { id: 3, name: "Testing", color: "pink-300" };
const STATUS_DEPLOYED = { id: 4, name: "Deployed", color: "green-300" };
export const STATUSES = [
  STATUS_ON_DECK,
  STATUS_IN_PROGRESS,
  STATUS_TESTING,
  STATUS_DEPLOYED,
]

// @ts-ignore
const StatusItem = ({ status, setColumnFilters, isActive }) => (
    <div
        className={`'flex flex-row cursor-pointer font-bold b-1 rounded-sm p-1 ${isActive ? "bg-gray-800" : "bg-transparent"} hover:bg-gray-800`}
        onClick={() =>
            // @ts-ignore
            setColumnFilters((prev) => {
            // @ts-ignore
            const statuses = prev.find((filter) => filter.id === "color")?.value;  // value is an array of status objects id
            if (!statuses) {
                return prev.concat({
                    id: "color",
                    value: [status.id],
                }); // concat a new filter object to the previous filters
            }

            // map through all the filter object
            return prev.map((f) =>
                f.id === "color" // check the filter object whose id = status {id: "color", value: [1,2,3]}
                    ? {
                        ...f,  //spread a new id in the array
                        value: isActive    // if the filter object is already in the filters
                        ? statuses.filter((s) => s !== status.id)   // remove it
                        : statuses.concat(status.id),  // otherwise add it in
                    }
                    : f
                );
            })
        }
    >
        <ColorIcon color={status.color} />
        <span>{status.name}</span>
    </div>
);

//@ts-ignore
const FilterPopover = ({ columnFilters, setColumnFilters }) => {
    const filterStatuses = columnFilters.find((f) => f.id === "color")?.value || [];  // filters {id: "color", value:[1,2,3]} the array with ids corresponding to a status id

    return (
        <Popover>
            <PopoverTrigger className="flex space-x-2 items-center hover:bg-muted/50 p-1 rounded-sm border-2">
                <FilterIcon size={'20'}/>
                <span>Filter</span>
            </PopoverTrigger>
            <PopoverContent>
                <p className="text-md font-bold">
                    Filter By:
                </p>
                <p className="font-bold text-gray-400 mb-1">
                    Status
                </p>
                <div  className='flex flex-col space-y-1'>
                    {STATUSES.map((status) => (
                        <StatusItem
                            status={status}
                            isActive={filterStatuses.includes(status.id)} // check if the status is in the filterStatuses columnfilter
                            setColumnFilters={setColumnFilters}
                            key={status.id}
                        />
                        ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};
export default FilterPopover;
