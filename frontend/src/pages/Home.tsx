import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="flex  flex-row justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center ">
      <Link to='/admin'>
        <Button variant="secondary" className="text-4xl font-bold p-10 mb-4 px-16 hover:bg-slate-400">Admin</Button>
      </Link>
      <Link to="/admin">
      <Button variant="secondary" className="text-4xl font-bold p-10 mt-4 hover:bg-slate-400">Employee</Button>
      </Link>

    </div>
    </div>
    
  )
}

export default Home


// Option to add more users on different location
// Admin dashboard has hardcoded credentials
