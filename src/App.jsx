import "./styles/App.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/layout/Footer";
import { Suspense } from "react";

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-obsidian dark:text-fog">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center"></div>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
