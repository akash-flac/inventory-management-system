"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ApprovalData } from "@/constants";
import { ApprovalDataType } from "@/types";
import { ItemDetails } from "./ItemDetails";
import { Inventory } from "../Inventory/InventoryTypes";


export const itemsData: Inventory[] = [
  {
      itemId: 1,
      itemName: "Wrench",
      partNumber: "WR-001",
      quantity: 50,
      price: 12.99
  },
  {
      itemId: 2,
      itemName: "Screwdriver",
      partNumber: "SD-002",
      quantity: 150,
      price: 8.49
  },
  {
      itemId: 3,
      itemName: "Hammer",
      partNumber: "HM-003",
      quantity: 85,
      price: 15.75
  },
  {
      itemId: 4,
      itemName: "Pliers",
      partNumber: "PL-004",
      quantity: 60,
      price: 10.99
  }
]

export const columns: ColumnDef<ApprovalDataType>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "employeeName",
    header: "Employee Name",
  },
  {
    accessorKey: "requestNumber",
    header: "Request Number",
  },
  {
    accessorKey: "items",
    header: "Inventory",
    cell: ({ row }) => (
      <ItemDetails itemDetails={itemsData}>
      {/* <ItemDetails itemDeatils={row.original}> */}
        <Button variant="outline">View Items{row.getValue('requestNumber')}</Button>
      </ItemDetails>
    ),
  },
  {
    accessorKey: "status",
    header: "Action",
    cell: ({ row }) => {
      const status = row.getValue("status");

      if (status === "Pending") {
        return (
          <div>
            <Button
              size="sm"
              variant="secondary"
              className="mr-1 hover:bg-green-300"
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="ml-1 hover:bg-red-300"
            >
              Deny
            </Button>
          </div>
        );
      }

      return status;
    },
  },
];

export function Approval() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: ApprovalData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
    initialState: {
      pagination: {
        pageSize: 9,
      },
    },
  });

  return (
    <div className="w-full h-[90dvh] rounded p-4 bg-white">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search Employee..."
          value={
            (table.getColumn("employeeName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("employeeName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Download
        </Button>
      </div>
      <div className="rounded-md border overflow-auto h-[70dvh]">
        <Table className="">
          <TableHeader className="sticky top-0">
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
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // className={
                  //   row.getValue("status") === "Approved"
                  //     ? "bg-green-300"
                  //     : row.getValue("status") === "Rejected"
                  //     ? "bg-red-300"
                  //     : ""
                  // }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-2 text-center">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
          <div>
            {table.getPageCount()}
            -
            {table.getPageOptions()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Approval;
