import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {  FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"

//@ts-ignores
const EditableCell = ({ getValue, row, column, table, form, name }) => {
  const initialValue = getValue();  // value from the initial data
  const [value, setValue] = useState(initialValue); // set it to state

  // When the input is blurred, we'll call our table meta's updateData function pass in the row.index, column id and value in the state
  const onBlur = () => {
    table.options.meta?.updateData(
      row.index, 
      column.id, 
      value
    );
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>
      <FormField
          control={form.control}
          name={`${name}${row.index}`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input 
                  type='number'
                  min={"0"}
                  onWheel={(e) => {e.target.blur()}}
                  placeholder={`${name}`} 
                  {...field} 
                  className=" focus:outline-none w-[70px]"
                  value={value} // default value
                  onChange={(e) => setValue(e.target.value)} // when editing the value
                  onBlur={onBlur}  // call onBlur to update the value
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    </div>
  );
};
export default EditableCell;
