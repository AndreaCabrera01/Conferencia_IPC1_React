import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import HomeAdmin from "../Pages/HomeAdmin";
import SeeEvents from "../Pages/SeeEvents";
import AdminLayout from "../Layout/AdminLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{
        path: "home",
        element: <HomeAdmin />,

    },{
        path: "seeEvents",
        element: <SeeEvents />,
    }


],
  },
]);
