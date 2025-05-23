import { Outlet } from "react-router-dom";
import DashSharerSidebar from "./DashSharerSidebar";
import { Suspense } from "react";
import SpinnerLoading from "../../components/SpinnerLoading";

const DashSharerLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-4">
      <DashSharerSidebar />
      <Suspense fallback={<SpinnerLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashSharerLayout;
