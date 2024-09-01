export type Employee = {
    empId: number;
    name: string;
  };
  
export type Item = {
    itemId: number,
    itemName: string,
    partNumber: string,
    quantity: number,
    price: number
  }

  export type ApprovalDataType = {
    date: string,
    employeeName: string,
    requestNumber: string,
    items: Item[],
    status: ApprovalStatus
  }


  export type ApprovalStatus =  'Pending' | 'Approved' | 'Rejected'