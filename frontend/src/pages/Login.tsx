import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { z } from "zod";
import { Button } from "@/components/ui/button";

import { Eye, EyeOff, CircleUser, LoaderCircle } from "lucide-react";

import axios from "axios";

import { BACKEND_URL } from "@/constants";

import { useRecoilState } from "recoil";

import { adminInfoState } from "../Atoms/admin";
import { loginAtom } from "../Atoms/login";

import { useNavigate } from "react-router-dom";
import CustomAlert from "@/components/CustomAlert";

const formSchema = z.object({
  username: z.string().trim().min(1, "Username can't be empty"),
  password: z.string().trim().min(1, "Password can't be empty"),
});

type FormFields = z.infer<typeof formSchema>;

function Login() {
  const navigate = useNavigate();

  const [adminInfo, setAdminInfo] = useRecoilState(adminInfoState);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginAtom);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [loginError, setLoginError] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "samfrostz",
      password: "samfrost@20",
    },
  });

  // Logging the adminInfo state when it changes
  useEffect(() => {
    // console.log("Updated adminInfo:", adminInfo);
    // console.log("Updated login:", isLoggedIn);
  }, [adminInfo, isLoggedIn]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log(`Backend URL : ${BACKEND_URL}`)
      const response = await axios.post(`${BACKEND_URL}/auth/login`, values);
      console.log(response.data);

      if (response.status === 200) {
        // Right now, it is a default login good case, add checking scenario for login fail
        console.log(response.data);
        setAdminInfo(response.data);
        setIsLoggedIn(true);
        navigate("/admin/dashboard");
      }
    } catch (error: unknown) {
      setIsSubmitting(false);

      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          form.reset();
          setLoginError(true);
          setTimeout(() => {
            setLoginError(false);
          }, 3000);
          console.error("Unauthorized:", error.response.data.message);
          // Handle the 401 error (e.g., redirect to login page, show a message to the user, etc.)
        } else {
          console.error("An error occurred:", error.message);
        }
      }
    }
  }
  function setLoginErrorFalse() {
    setLoginError(false);
  }
  return (
    <div className="w-full min-h-screen flex flex-row items-center justify-center">
      <Card className="bg-slate-100  w-[30%] drop-shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              //   className="space-y-8 bg-white w-6/12 h-4/6 p-6 rounded border-2 "
            >
              {/* <div className="flex flex-row justify-center items-center">
                <p className="font-bold text-3xl">Add Item</p>
              </div> */}

              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <div className="flex flex-row items-center justify-center">
                        <Input
                          placeholder="Username"
                          disabled={isSubmitting}
                          {...field}
                        />

                        <CircleUser size={30} className="ml-2" />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="flex flex-row items-center justify-center">
                        <Input
                          disabled={isSubmitting}
                          placeholder="Password"
                          type={isPasswordVisible ? "text" : "password"}
                          {...field}
                        />
                        {isPasswordVisible ? (
                          <Eye
                            size={30}
                            className="ml-2 hover:cursor-pointer"
                            onClick={() => setIsPasswordVisible(false)}
                          />
                        ) : (
                          <EyeOff
                            size={30}
                            className="ml-2 hover:cursor-pointer"
                            onClick={() => setIsPasswordVisible(true)}
                          />
                        )}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row justify-center items-center mt-6">
                <Button type="submit" className="px-6 text-lg">
                  {isSubmitting ? (
                    <LoaderCircle size={18} className="animate-spin mr-2" />
                  ) : (
                    <></>
                  )}

                  {isSubmitting ? "Loading..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loginError ? (
        <CustomAlert title="Unauthorized!" description="Incorrect username or password!" setErrorOrSuccess={setLoginErrorFalse}   />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Login;

