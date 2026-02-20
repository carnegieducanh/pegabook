import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { RouterProvider } from "react-router-dom";

import AuthProvider from "./contexts/AuthProvider.jsx";
import LanguageProvider from "./contexts/LanguageProvider.jsx";
import ThemeProvider from "./contexts/ThemeProvider.jsx";
import router from "./routers/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <RouterProvider router={router}>
                        <App />
                    </RouterProvider>
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    </React.StrictMode>
);
