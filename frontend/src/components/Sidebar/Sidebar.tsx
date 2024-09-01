import UserInfo from "./UserInfo"
import Menu from "./Menu"
import { LogOut } from "lucide-react"


import { adminInfoState } from "@/Atoms/admin";
import { loginAtom } from "@/Atoms/login";
import { useRecoilState } from "recoil";

import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react'
import { BACKEND_URL } from "@/constants";

import axios from 'axios';

function Sidebar() {


  const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginAtom);

  useEffect(() => {
    // PRINITNG TO FIX BUILD ERROR
    console.log(adminInfo)
    console.log("isLoggedIn : " + isLoggedIn)

  }, [isLoggedIn, adminInfo])


  const navigate = useNavigate();

  return (


    <div className="flex flex-col w-[270px] min-w-[270px] border-r min-h-screen p-2 bg-white
     overflow-y-auto">
      <UserInfo />
      <div className="grow ">
      <Menu />

      </div>
      <LogOut className="transform rotate-180 hover:cursor-pointer" onClick={async () => {
          const response = await axios.get(`${BACKEND_URL}/auth/logout`);

          console.log(response.status)
          console.log(response.data)
          setAdminInfo(null)
          setIsLoggedIn(false)
          navigate('/admin/dashboard');
      }}/>
    </div>
  )
}


export default Sidebar