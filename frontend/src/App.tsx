import AddEmployee from "./pages/Employee/AddEmployee"
import ShowInventory from "./pages/Inventory/ShowInventory"
import Login from "./pages/Login"
import AssignItems from "./pages/Inventory/AssignItems"


function App() {

  return (
      <div>
        <AddEmployee />
        <ShowInventory />
        <br />
        <Login />
        <br />
        <AssignItems />
      </div>
  )
}

export default App
