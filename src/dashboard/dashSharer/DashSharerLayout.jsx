import { Outlet } from "react-router-dom";
import DashSharerSidebar from "./DashSharerSidebar";

const DashSharerLayout = () => {
    return (
        <div className="flex lg:gap-4 flex-col lg:flex-row">
            <DashSharerSidebar />
            <Outlet />
        </div>
    );
};

export default DashSharerLayout;
