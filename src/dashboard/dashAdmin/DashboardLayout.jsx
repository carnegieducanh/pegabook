import { Outlet } from "react-router-dom";
import DashSidebar from "./DashSidebar";

const DashboardLayout = () => {
    return (
        <div className="flex gap-4 flex-col lg:flex-row">
            <DashSidebar />
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
