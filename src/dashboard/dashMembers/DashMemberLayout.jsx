import { Outlet, Navigate } from "react-router-dom";
import DashMemberSidebar from "./DashMemberSidebar";
import { Suspense } from "react";

const DashMemberLayout = () => {
  const memberSession = (() => {
    try {
      const saved = localStorage.getItem("memberSession");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();

  if (!memberSession) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col dark:bg-obsidian lg:flex-row lg:gap-4">
      <DashMemberSidebar />
      <Suspense>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DashMemberLayout;
