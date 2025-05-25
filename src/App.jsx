import "./App.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./home/Footer";
import { Suspense } from "react";

function App() {
  return (
    <div>
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
