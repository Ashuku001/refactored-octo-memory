/* eslint-disable react/display-name */
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {CalendarIcon} from "lucide-react";

//@ts-ignore
const DateCustomInput = forwardRef(({ value, onClick, clearDate }, ref) => (
  // @ts-ignore
  <div ref={ref} onClick={onClick} className="cursor-pointer">
    {value ? (
      <>
        {value}
        <div
          className="absolute r-3 text-red-300 text-md"
          onClick={(e) => {
            e.stopPropagation();
            clearDate();
          }}
        >
          &times;
        </div>
      </>
    ) : (
      <CalendarIcon size="20" />
    )}
  </div>
));

//@ts-ignore
const DateCell = ({ getValue, row, column, table }) => {
  const date = getValue();
  const { updateData } = table.options.meta;
  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat="MMM d"
      selected={date}
      onChange={(date) => updateData(row.index, column.id, date)}
      customInput={
        <DateCustomInput
        // @ts-ignore
          clearDate={() => updateData(row.index, column.id, null)}
        />
      }
    />
  );
};
export default DateCell;
