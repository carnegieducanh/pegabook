import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";

import AuthProvider from "./contects/AuthProvider.jsx";
import LanguageProvider from "./contects/LanguageProvider.jsx";
import ThemeProvider from "./contects/ThemeProvider.jsx";
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
