'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { SortAscIcon, SortDescIcon, ArrowDownUpIcon } from "lucide-react"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, ColumnDef, ColumnFiltersState } from "@tanstack/react-table"

import { Table, TableBody, TableCell,  TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {Filters,  ColumnFiltersStateType } from "@/components/Table/Filters"
import { Button } from "@/components/ui/button"

// create this array dynamically depending on what is returned
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  setData: any,
  paginate: Boolean,

  setSearchKey: Dispatch<SetStateAction<string>>;
  searchKeyOptions: string[];
  searchKey: string,
}

function CustomDataTable<TData, TValue>({
  columns,
  data,
  setData,
  paginate,

  searchKey,
  setSearchKey,
  searchKeyOptions
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState([]);
  console.log("Check it out")
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters, // pass the columns for filter to the state of the 
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    meta: {
      // @ts-ignore
      updateData: (rowIndex, columnId, value) => // updates the cell with the value passed
        setData((prev: any) =>
          prev.map((row:any, index: number) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row
          )
        ),
    },
  });

  useEffect(() => {
    setColumnFilters([])
  }, [searchKey])
  
  return (
    <div>
      <Filters 
        searchKey={searchKey} 
        setSearchKey={setSearchKey} 
        searchKeyOptions={searchKeyOptions} 
        
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      <Table className={`w-full border`}>
        {/*@ts-ignore */}
        {table.getHeaderGroups().map((headerGroup) => 
          <TableHeader key={headerGroup.id} className="bg-muted/80 dark:bg-muted/50">
            <TableRow>
              {headerGroup.headers.map((header) => (
                <TableHead key = {header.id} className={`w-${header.getSize()}`}>
                  <div className=" flex space-x-2 items-center">
                    <span>
                      {/*@ts-ignore */}
                      {header?.column?.columnDef?.header}
                    </span>
                    {header.column.getCanSort() && 
                      <ArrowDownUpIcon 
                        size={"20"}
                        onClick={header.column.getToggleSortingHandler()}
                      />
                    }
                    {
                      {"asc": <SortAscIcon 
                        size={"20"}
                        onClick={header.column.getToggleSortingHandler()}
                      />,
                      "desc": <SortDescIcon
                        size={"20"}
                        onClick={header.column.getToggleSortingHandler()}
                      />
                      // @ts-ignore
                      }[header.column.getIsSorted()]
                    }
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {/* @ts-ignore */}
              {row.getVisibleCells().map((cell) => (
                <TableCell className={`w-${cell.column.getSize()}`} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
          ) : (
            <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
            </TableRow>
        )}
        </TableBody>
      </Table>
      {paginate &&
        <div className="flex items-center w-full justify-end space-x-2 py-4">
          <p>
            Page {" "}
            {table.getState().pagination.pageIndex + 1} 
            {" "}of{" "}
            {table.getPageCount()}
          </p>
          <div className="flex space-x-2">
            <Button 
              onClick={() => 
                table.previousPage()
              }
              disabled={!table.getCanPreviousPage()}
              variant={"outline"}
              type="button"
            >Prev</Button>
            <Button
              onClick={() => 
                table.nextPage()
              }
              disabled={!table.getCanNextPage()}
              variant={"outline"}
              type="button"
            >Next</Button>
          </div>
        </div>
      }
    </div>
  )
}

export default CustomDataTable