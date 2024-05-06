import "./App.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./home/Footer";

function App() {
    return (
        <>
            <Navbar />
            <div className="">
                <Outlet />
            </div>

            <Footer />
        </>
    );
}

export default App;
