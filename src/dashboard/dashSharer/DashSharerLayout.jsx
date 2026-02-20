import { Outlet } from "react-router-dom";
import DashSharerSidebar from "./DashSharerSidebar";
import { Suspense } from "react";

const DashSharerLayout = () => {
  return (
    <div className="dark:bg-obsidian flex min-h-screen flex-col lg:flex-row lg:gap-4">
      <DashSharerSidebar />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashSharerLayout;
