import {
    CircleUserRound,
    LayoutDashboard,
    NotebookPen,
    Settings,
    ShieldAlert,
    User,
    // Wrench,
    UserPlus,
    ListChecks,
    CircleArrowRight,
    Pencil,
    UsersRound,
    Plus,
    GanttChart,
    
  } from "lucide-react";

import { Inventory } from "./pages/Inventory/InventoryTypes";
import { ApprovalDataType } from "./types";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL


export const ApprovalData: ApprovalDataType[] = [
  {
    "date": "2024-05-01",
    "employeeName": "John Doe",
    "requestNumber": "REQ001",
    "items": [
      { "itemId": 1, "itemName": "Laptop", "quantity": 1, "price": 1500, "partNumber": "P001" },
      { "itemId": 2, "itemName": "Mouse", "quantity": 1, "price": 25, "partNumber": "P002" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-02",
    "employeeName": "Jane Smith",
    "requestNumber": "REQ002",
    "items": [
      { "itemId": 3, "itemName": "Keyboard", "quantity": 2, "price": 50, "partNumber": "P003" },
      { "itemId": 4, "itemName": "Monitor", "quantity": 1, "price": 300, "partNumber": "P004" }
    ],
    "status": "Approved"
  },
  {
    "date": "2024-05-03",
    "employeeName": "Alice Johnson",
    "requestNumber": "REQ003",
    "items": [
      { "itemId": 5, "itemName": "Chair", "quantity": 1, "price": 100, "partNumber": "P005" },
      { "itemId": 6, "itemName": "Desk", "quantity": 1, "price": 200, "partNumber": "P006" }
    ],
    "status": "Rejected"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },

  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
  {
    "date": "2024-05-04",
    "employeeName": "Bob Brown",
    "requestNumber": "REQ004",
    "items": [
      { "itemId": 7, "itemName": "Notebook", "quantity": 5, "price": 15, "partNumber": "P007" },
      { "itemId": 8, "itemName": "Pen", "quantity": 10, "price": 5, "partNumber": "P008" }
    ],
    "status": "Pending"
  },
];


export const menuList = [
    {
      group: "General",
      items: [
        {
          link: "/admin/dashboard",
          icon: <LayoutDashboard />,
          text: "Dashboard",
        },
        {
          link: "",
          icon: <User />,
          text: "Employee",
          subItems: [
              { link: "/admin/employee/add", icon: <UserPlus />, text: "Add" },
              { link: "/admin/employee/overview", icon: <UsersRound />, text: "Manage" }
            ],
        },
        { 
          link: "",
          icon: <ListChecks />,
          text: "Inventory",
          subItems: [
              { link: "/admin/inventory/overview", icon: <GanttChart />, text: "Overview" },
              { link: "/admin/inventory/add", icon: <Plus />, text: "Add" },
              { link: "/admin/inventory/assign", icon: <CircleArrowRight />, text: "Assign" },
              { link: "/admin/inventory/update", icon: <Pencil />, text: "Update" }
            ],
        }, 
        { 
          link: "/admin/approval",
          icon: <NotebookPen />,
          text: "Approval",
        },
        // {
        //   link: "",
        //   icon: <Wrench />,
        //   text: "Asset",
        //   subItems: [
        //       { link: "/admin/asset/overview", icon: <UserPlus />, text: "Add" },
        //       { link: "/admin/asset/add", icon: <UsersRound />, text: "Manage" }
        //     ],
        // },
        {
          link: "",
          icon: <ShieldAlert />,
          text: "Defective Return",
          subItems: [
              { link: "/admin/defective/overview", icon: <UserPlus />, text: "Return  Item" },
              { link: "/admin/defective/return", icon: <UsersRound />, text: "Defective" }
            ],
        },
      ],
    },
    {
      group: "Settings",
      items: [
        {
          link: "/admin/settings/general",
          icon: <Settings />,
          text: "General Settings",
        },
        {
          link: "/admin/settings/profile",
          icon: <CircleUserRound />,
          text: "Profile",
        },
      ],
    },
  ];

  export const data: Inventory[] = [
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
    },
    {
        itemId: 5,
        itemName: "Drill",
        partNumber: "DR-005",
        quantity: 30,
        price: 45.00
    },
    {
        itemId: 6,
        itemName: "Tape Measure",
        partNumber: "TM-006",
        quantity: 120,
        price: 6.89
    },
    {
        itemId: 7,
        itemName: "Utility Knife",
        partNumber: "UK-007",
        quantity: 200,
        price: 5.50
    },
    {
        itemId: 8,
        itemName: "Level",
        partNumber: "LV-008",
        quantity: 75,
        price: 9.99
    },
    {
        itemId: 9,
        itemName: "Allen Key Set",
        partNumber: "AK-009",
        quantity: 40,
        price: 18.25
    },
    {
        itemId: 10,
        itemName: "Socket Set",
        partNumber: "SS-010",
        quantity: 25,
        price: 35.00
    },
    {
        itemId: 11,
        itemName: "Sledgehammer",
        partNumber: "SH-011",
        quantity: 20,
        price: 25.99
    },
    {
        itemId: 12,
        itemName: "Chisel",
        partNumber: "CH-012",
        quantity: 90,
        price: 7.49
    },
    {
        itemId: 13,
        itemName: "Adjustable Wrench",
        partNumber: "AW-013",
        quantity: 40,
        price: 14.99
    },
    {
        itemId: 14,
        itemName: "Hand Saw",
        partNumber: "HS-014",
        quantity: 55,
        price: 13.99
    },
    {
        itemId: 15,
        itemName: "Cordless Drill",
        partNumber: "CD-015",
        quantity: 25,
        price: 60.00
    },
    {
        itemId: 16,
        itemName: "Clamp",
        partNumber: "CL-016",
        quantity: 70,
        price: 8.99
    },
    {
        itemId: 17,
        itemName: "Hacksaw",
        partNumber: "HS-017",
        quantity: 45,
        price: 12.50
    },
    {
        itemId: 18,
        itemName: "Nail Gun",
        partNumber: "NG-018",
        quantity: 15,
        price: 75.00
    },
    {
        itemId: 19,
        itemName: "Workbench",
        partNumber: "WB-019",
        quantity: 10,
        price: 150.00
    },
    {
        itemId: 20,
        itemName: "Paint Sprayer",
        partNumber: "PS-020",
        quantity: 35,
        price: 55.00
    }
];
