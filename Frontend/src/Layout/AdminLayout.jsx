import { Outlet } from "react-router-dom";
import NavBar from "../Pages/NavBar";

const AdminLayout = () => {
  return (
    <>
      <div className="flex">
        <NavBar />
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
