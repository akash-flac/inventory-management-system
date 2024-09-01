import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

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

import { AssignDialog } from "./AssignDialog";
// import { data } from "@/constants";

import { Inventory } from "../InventoryTypes";
import { Input } from "@/components/ui/input";

import axios from "axios";
import { BACKEND_URL } from "@/constants";

import { useRecoilValue } from "recoil";
import { adminInfoState } from "@/Atoms/admin";

type AssignedItem = (item: Inventory) => void;

interface AssignTableProps {
  addAssignedItem: AssignedItem;
  assignedItems: Inventory[];
}

function AssignTable({ addAssignedItem, assignedItems}: AssignTableProps) {
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
      //   cell: ({row}) => [
      //     <Input value={row.getValue('quantity')} type="number"/>
      //   ]
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "itemId",
      header: "Add Item",
      cell: ({ row }) => {
      
      // Check if the item is already assigned
      const isItemAlreadyAssigned = assignedItems.some((item) => item.itemId === row.getValue("itemId"));

        return (
          <AssignDialog item={row.original} addAssignedItem={addAssignedItem}>
            <Button
              variant="outline"
              size="sm"
              disabled={isItemAlreadyAssigned}
              onClick={() => {
                row.getValue("itemId");
              }}
              className=""
            >
              {" "}
              Add{" "}
            </Button>
          </AssignDialog>
        );
      },
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Inventory[]>([])
 

  const adminInfo = useRecoilValue(adminInfoState)

  useEffect(() => {

    const fetchData = async () => {
      try {
        console.log("GETINNG ITEMS DSTA")
        console.log(adminInfo)
        const response = await axios.get(`${BACKEND_URL}/item/${adminInfo?.location}`);
        console.log(response)
        setData(response.data);
        console.log("DONENENNE")

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();

  }, [])

  console.log(data);

  const table = useReactTable({
    data,
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

  return (
    <div className="rounded-md h-[70vh] ">
      <Input
        placeholder="Search Item..."
        value={(table.getColumn("itemName")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn("itemName")?.setFilterValue(event.target.value)
        }
        className="max-w-sm mb-2"
      />
      <div className="rounded-md h-[65vh] overflow-auto ">
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
                    <TableCell key={cell.id} className="p-1">
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default AssignTable;
