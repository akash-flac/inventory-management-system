import { Outlet, Navigate, useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";
import { loginAtom } from "../Atoms/login";
import axios from "axios";
import { BACKEND_URL } from "@/constants";
import { useState, useEffect } from "react";

axios.defaults.withCredentials = true;

function ProtectedRoute() {
  // console.clear();
  console.log("CHECKING ROUTE PROTECTION");

  const navigate = useNavigate();

  // Check if locally loginStatus is set to true,
  const [loginStatus, setLoginStatus] = useRecoilState(loginAtom);
  console.log("Login Atom Initial State : ", loginStatus);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function pingServer() {
        
        if (loginStatus) {

        setIsLoading(false);
          return;
        }
        
        let response = null;

        // If local login is not true, then send the cookie to backend to check if valid
        try {
          
          console.log("Sending request to backend!");
          await axios.get(`${BACKEND_URL}/auth/isAuthenticated`).then((res) => {
            response = res;
            console.log(res);
          });

          console.log("Got response from backend!");
          console.log(response);
          setLoginStatus(true)

        } catch (error: unknown) {
          console.log("Entering catch block")

          if (axios.isAxiosError(error)) {
          console.log("Entering 1 if. Error is axios error")


            if (error.response && error.response.status === 401) {
            console.log("Entering 2 if. 401 ERROR HAS OCCURED!")


              console.error("Unauthorized:", error.response.data.message);

              if (
                error.response.data.message === "Refresh Token Expired" ||
                error.response.data.message === "Refresh Token Invalid" ||
                error.response.data.message === "Refresh Token Missing!"
              ) {
                navigate("/login");
              }

              navigate("/login");

            } else {
              console.log("Entering 2 ele block!!!! RANDOM ERROR!")
              console.error("An error occurred:", error.message);
              navigate("/login");
            }
          }

          setLoginStatus(false)

        }
  
    }

    pingServer();

  }, [loginStatus]);

  if (isLoading) {
    console.log("Loading authentication check...");
    return <div>Loading...</div>; // You can replace this with a loading spinner or component
  }

  if (loginStatus) {
    console.log("Successfully logged in, returning the specific screen!");
    return <Outlet />;
  } else {
    console.log("Sending user to login screen!");
    return <Navigate to="/login" />
  }


  // if local login true, render the page
  // return loginStatus ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
