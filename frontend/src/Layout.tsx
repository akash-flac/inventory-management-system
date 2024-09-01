import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar/Sidebar'

function Layout() {
  return (
    // <div className='flex items-center justify-between' >
    //     <Sidebar />
    //     <main className='flex flex-row justify-center items-center p-4 w-full min-h-screen  bg-slate-100 max-h-screen overflow-hiden'>
    //     <Outlet />
    //     </main>
        
    // </div>
    <div className='flex items-center justify-between bg-slate-100' >
        <Sidebar />
        <main className='flex flex-row justify-center items-center p-4 w-full min-h-screen  bg-slate-100 max-h-screen overflow-y-auto'>
        <Outlet />
        </main>
        
    </div>
  )
}

export default Layout