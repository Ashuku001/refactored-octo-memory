import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { STATUSES } from "@/lib/data";
import { Button } from '@/components/ui/button';

//@ts-ignore
export const ColorIcon = ({ color}) => (
  <div className={`w-10 h-aut0  bg-${color} rounded-sm b-1 mr-3`} />
);
  
//@ts-ignore
const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {}; // destructure the object returned by the status of the task
  const { updateData } = table.options.meta;

  console.log(name, color)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={'ghost'}
          className={`bg-${color ?color : "bg-slate-900"}`}
        >
          {name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col" >
        <DropdownMenuTrigger onClick={() => updateData(row.index, column.id, null)}>
          <ColorIcon color="red-400"/>
          None
        </DropdownMenuTrigger>
        {STATUSES.map((status) => (
          <DropdownMenuTrigger
            onClick={() => updateData(row.index, column.id, status)}
            key={status.id}
          >
            <ColorIcon color={status.color}/>
            {status.name}
          </DropdownMenuTrigger>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default StatusCell;
