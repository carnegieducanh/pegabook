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
            colors: {
                // ── Brand ───────────────────────────────────────────────────────
                brand:     '#a69060',    // Vàng đồng – màu nhận diện chính
                cream:     '#f4f1ea',    // Kem ấm – nền light mode

                // ── Nền dark mode (sáng → tối) ──────────────────────────────────
                ember:     '#383323',    // Nâu ấm tối – navbar / footer
                onyx:      '#292a2d',    // Tối – card / dropdown
                obsidian:  '#202124',    // Tối – nền trang
                void:      '#181a1b',    // Tối nhất – nền sâu
                flint:     '#35363a',    // Hover – dark mode
                iron:      '#3c4043',    // Border – dark mode

                // ── Thang xám ấm (chữ & UI) ─────────────────────────────────────
                fog:       '#e8eaed',    // Sáng – chữ chính trên nền tối
                linen:     '#cdc4b7',    // Nhạt – tiêu đề trên nền tối
                pebble:    '#aca49a',    // Trung – chữ phụ trên nền tối
                dust:      '#9aa0a6',    // Mờ – chữ thứ cấp trên nền tối
                ash:       '#dadada',    // Neutral – hover / swiper
                dusk:      '#5a5a5a',    // Phụ – chữ thứ cấp trên nền sáng

                // ── Form & panel ─────────────────────────────────────────────────
                ghost:     '#f9fafb',    // Nền input
                mist:      '#f0f2f5',    // Nền input – variant
                veil:      '#fffffff2',  // Trắng mờ – content panel

                // ── Accent ───────────────────────────────────────────────────────
                sienna:        '#825445',  // Nâu đỏ – tác giả / thể loại
                'sienna-soft': '#b39183',  // Nâu nhạt – dark mode variant
                maroon:        '#99154b',  // Đỏ thẫm – member (light mode)
                blush:         '#ea6391',  // Hồng – member (dark mode)
                cobalt:        '#354d75',  // Xanh thép – nút hành động
                magenta:       '#c23f69',  // Hồng đậm – countdown timer
                ocean:         '#02598b',  // Xanh dương đậm – "xem thêm" (light)
                azure:         '#6bc8fd',  // Xanh dương sáng – "xem thêm" (dark)
            },
        },
    },
    plugins: [require("flowbite/plugin")],
};
