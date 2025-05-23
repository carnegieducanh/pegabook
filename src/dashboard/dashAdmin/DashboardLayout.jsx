import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";
import { Suspense } from "react";
import SpinnerLoading from "../../components/SpinnerLoading";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <DashSidebar />
      <Suspense fallback={<SpinnerLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
