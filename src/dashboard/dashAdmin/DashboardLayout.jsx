import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import { Suspense } from "react";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <DashSidebar />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
