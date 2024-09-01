import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { RecoilRoot } from "recoil";

import "./index.css";
import Layout from "./Layout.tsx";
// import Home from "./pages/Home.tsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.tsx";
import App from "./App.tsx";

import AllEmployee from "./pages/Employee/AllEmployee.tsx";
import AddEmployee from "./pages/Employee/AddEmployee.tsx";

import ShowInventory from "./pages/Inventory/ShowInventory.tsx";
import AddItems from "./pages/Inventory/AddItems.tsx";
import AssignItems from "./pages/Inventory/AssignItems.tsx";
import UpdateInventory from "./pages/Inventory/UpdateInventory.tsx";

import Approval from "./pages/Approval/Approval.tsx";

import ShowAsset from "./pages/Asset/ShowAsset.tsx";
import AddAsset from "./pages/Asset/AddAsset.tsx";

import AddDefective from "./pages/Defective/AddDefective.tsx";
import ShowDefective from "./pages/Defective/ShowDefective.tsx";

import Profile from "./pages/Settings/Profile.tsx";
import GeneralSettings from "./pages/Settings/GeneralSettings.tsx";

import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Login />} />
      <Route path="login" element={<Login />} />

     
        <Route element={<ProtectedRoute />}>
        <Route path="admin" element={<Layout />}>
          <Route path="test" element={<App />} />

          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="employee">
            <Route path="overview" element={<AllEmployee />} />
            <Route path="add" element={<AddEmployee />} />
          </Route>

          <Route path="inventory">
            <Route path="overview" element={<ShowInventory />} />
            <Route path="add" element={<AddItems />} />
            <Route path="assign" element={<AssignItems />} />
            <Route path="update" element={<UpdateInventory />} />
          </Route>

          <Route path="approval">
            <Route path="" element={<Approval />} />
          </Route>

          <Route path="asset">
            <Route path="overview" element={<AddAsset />} />
            <Route path="add" element={<ShowAsset />} />
          </Route>

          <Route path="defective">
            <Route path="overview" element={<AddDefective />} />
            <Route path="return" element={<ShowDefective />} />
          </Route>

          <Route path="settings">
            <Route path="general" element={<GeneralSettings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
    </Route>

      </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  // </React.StrictMode>
);
