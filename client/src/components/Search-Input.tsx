import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

type Props = {
    placeholder: string;
    value: string;
    onValueChange: (value: string) => void;
    className: string;
}

export const SearchInput = ({placeholder, value, onValueChange, className}: Props) => {


  return (
    <div className={cn(className, "w-full flex items-center relative ",)}>
        <SearchIcon size="20" className="absolute left-1"/>
        <Input
            type="text"
            placeholder={placeholder}
            className="rounded-sm pl-7 w-full"
            value={value}   // value of the object with an id = task
            onChange={(e) => onValueChange(e.target.value)}
        />
    </div>
  )
};