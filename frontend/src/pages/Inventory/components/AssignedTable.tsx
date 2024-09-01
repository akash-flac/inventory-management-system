import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Employee } from "@/types";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from 'axios';
import { Inventory } from "../InventoryTypes";
import { BACKEND_URL } from '@/constants';
import { useRecoilValue } from 'recoil'
import { adminInfoState } from "@/Atoms/admin"


// type SelectedEmployees = Employee[];
type SelectedEmployees = Employee;


interface AssignedTableProps {
  selectedEmployees: SelectedEmployees | undefined;
  assignedItems: Inventory[];
}

function AssignedTable({
  assignedItems,
  selectedEmployees,
}: AssignedTableProps) {
  const columns: ColumnDef<Inventory>[] = [
    {
      accessorKey: "itemName",
      header: "Item Name",
    },
    {
      accessorKey: "partNumber",
      header: "Part Number",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});


  const adminInfo = useRecoilValue(adminInfoState)
  console.log(assignedItems);



  const table = useReactTable({
    data: assignedItems,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  async function sendDataToBackend() {

  const data = {
    empId: selectedEmployees?.empId,
    items: assignedItems,
    location: adminInfo?.location
  }
    try {
      const response = await axios.post(`${BACKEND_URL}/item/assign`, data)
      console.log(response.data)
      window.location.reload()
    } catch (err)  {
      console.log(err)
      window.location.reload()
    }
  }

  return (
    <div>
      <div className="font-bold text-2xl text-center">Assignments</div>

      {/* <div className="bg-white p-2 rounded-md my-2 min-h-[4.5rem]"> */}
      <div className="bg-white p-2 rounded-md my-2 ">
        <p>
          <span className="text-lg font-bold">Employee: </span>
          {/* {selectedEmployees.length > 0 ? (
            <span>
              {selectedEmployees.map((employee: Employee) => {
                if (
                  selectedEmployees[selectedEmployees.length - 1] === employee
                ) {
                  // Last element of the array
                  return (
                    <span key={employee.empId}> {employee.name} </span>
                  );
                } else {
                  return (
                    <span key={employee.empId}> {employee.name}, </span>
                  );
                }
              })}
            </span>
          ) : (
            <span>No Employee Selected Yet</span>
          )} */}
          {
            selectedEmployees ? <span key={selectedEmployees.empId}> {selectedEmployees.name} </span>
            : <></>
          }
            
        </p>
      </div>

      <div className="h-[62dvh] overflow-auto">
        <Table className="border">
          <TableHeader className="sticky top-0 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="overflow-scroll bg-slate-100">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No item assigned.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-row   items-center justify-end mt-2">
        <Button variant="default" size="default" onClick={sendDataToBackend}>
          Assign
        </Button>
      </div>
    </div>
  );
}

export default AssignedTable;
