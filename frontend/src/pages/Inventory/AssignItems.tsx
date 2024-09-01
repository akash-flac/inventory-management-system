import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AssignTable from "./components/AssignTable";
import AssignedTable from "./components/AssignedTable";

import { Employee } from "@/types";

import axios from "axios";
import { BACKEND_URL } from "@/constants";

import { useRecoilValue } from "recoil";
import { adminInfoState } from "@/Atoms/admin";

export type Inventory = {
  itemId: number;
  itemName: string;
  partNumber: string;
  quantity: number;
  price: number;
};


export function AssignItems() {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [selectedEmployees, setselectedEmployees] = useState<Employee>();
  const [assignedItems, setAssignedItems] = useState<Inventory[]>([]);
  const [isEmployeeSearchFocused, setIsEmployeeSearchFocused] = useState<boolean>(false);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([])


  const adminInfo = useRecoilValue(adminInfoState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Reading all employee data123123123132132");
        console.log(adminInfo);
        const response = await axios.get(`${BACKEND_URL}/employee/forAssignment/`, {
          params : {
            location: adminInfo?.location
          }
        });
        console.log(response);
        setAllEmployees(response.data);
        console.log(allEmployees)
        console.log("DONENENNE123123123113231");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  function addAssignedItem(item: Inventory) {
    setAssignedItems([...assignedItems, item]);
    console.log(assignedItems);
  }

  useEffect(() => {
    setFilteredEmployees(
      allEmployees.filter((employee) => {
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm.length === 0) {
          return true; // Return all employees if searchTerm is empty or just whitespace
        }
        return employee.name.toLowerCase().startsWith(trimmedSearchTerm.toLowerCase());
      })
      
    );
  }, [searchTerm]);

  function searchEmployeeClick(key: number, name: string) {
    console.log("Employee Clicked");
    console.log(name, key);

    const searchEmployee = {
      empId: key,
      name: name,
    };

    console.log(searchEmployee);
    console.log(selectedEmployees);

    // const employeeExists = selectedEmployees.some((employee) => {
    //   if (employee.empId == key) {
    //     return true;
    //   }
    //   return false;
    // });

    // if (employeeExists) {
    //   console.log("Employee already added!");
    // } else {
    //   console.log("Employee doesn't exist");
    //   setselectedEmployees([...selectedEmployees, searchEmployee]);
    // }
    setselectedEmployees( searchEmployee);

  }

  return (
    <div className="w-full h-[90vh] rounded bg-white p-4 flex flex-row justify-between">
      <div className="bg-slate-100 h-9/12 w-[48%] ml-1 p-3">
      <div>
      </div>
        <div className="font-bold text-2xl text-center">Selections</div>
          <Input
            type="text"
            className="my-2"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              console.log(searchTerm);
            }}
            onFocus={() => {

              console.log("setting trues")
              setIsEmployeeSearchFocused(true);
            }}
            onBlur={() => {
              console.log("setting false via timeout")

              setTimeout(() => {
              setIsEmployeeSearchFocused(false);
              }, 100)
            }}
            placeholder="Search Employee..."
          />

          { isEmployeeSearchFocused ? (
            <div className="absolute rounded p-1 bg-white z-30 w-4/12 mt-0.5">
              <ul>
                {filteredEmployees.map((employee) => {
                  return (
                    <li
                      className="hover:bg-slate-300"
                      key={employee.empId}
                      onClick={() => {
                        searchEmployeeClick(
                          employee.empId,
                          employee.name
                        );

                    console.log("setting false by click")
                      setIsEmployeeSearchFocused(false);

                      }}
                    >
                      {employee.name}
                    </li>
                    
                  );
                })}
              </ul>
            </div>
          ) : (
            <></>
          )}

        <AssignTable addAssignedItem={addAssignedItem} assignedItems={assignedItems}/>
      </div>

      <div className="bg-slate-100 w-[48%] mr-1 p-4">
        <AssignedTable assignedItems={assignedItems} selectedEmployees={selectedEmployees} />
      </div>
    </div>
  );
}

export default AssignItems;
