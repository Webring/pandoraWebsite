/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "pplight": "#EADBF0",
                "ppbase": "#9b59b6",
                "ppdark": "#903fb1",
            },
            keyframes: {
                wiggle: {
                    '75%, 100%': {
                        transform: "scale(2)",
                        opacity: 0,
                    },
                }
            },
            animation: {
                slowPing: 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite; ',
            }
        },
    },
    plugins: [],
}