import { Outlet } from "react-router-dom";
import DashBorrowerSidebar from "./DashBorrowerSidebar";

const DashBorrowerLayout = () => {
    return (
        <div className="flex gap-4 flex-col lg:flex-row">
            <DashBorrowerSidebar />
            <Outlet />
        </div>
    );
};

export default DashBorrowerLayout;
