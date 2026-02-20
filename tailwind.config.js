/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: [
                    "Roboto",
                    "Merriweather",
                    "serif",
                    "Segoe UI Historic",
                    "Segoe UI",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                ], // đặt font mặc định cho các phần tử sans
                title: ["Noto Serif", "serif", "Poppins", "sans-serif"],
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
